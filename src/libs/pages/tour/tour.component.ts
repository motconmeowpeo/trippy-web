import { Component, OnInit } from '@angular/core';
import { TourFacade } from '@core/services/tour';
import { Observable, tap, debounceTime } from 'rxjs';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faUser, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { LocationFacade } from '@core/services';
import { ISearchForm } from './tour.form';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IBaseParams, ISelectItem } from '@core/model';
@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
})
export class TourComponent implements OnInit {
  tours$ = this.tourFacade.tours$;
  faLocationDot = faLocationDot;
  faCalendar = faCalendar;
  faUser = faUser;
  isLoading = false;
  form!: FormGroup<ISearchForm>;
  selectCountry: ISelectItem[] = [];
  country = '';
  search = '';
  constructor(
    private tourFacade: TourFacade,
    private locationfacade: LocationFacade
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.createForm();
    this.tourFacade.getAll().subscribe();
    this.locationfacade
      .getAllLocation()
      .pipe(
        tap((locations) => {
          this.selectCountry = [{ name: 'All country', value: '' }];

          const country = locations.map((location) => {
            return {
              name: location.name,
              value: location.iso2,
            };
          });
          this.selectCountry = [...this.selectCountry, ...country];
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  private createForm() {
    this.form = new FormGroup({
      country: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
        updateOn: 'change',
      }),

      search: new FormControl('', { nonNullable: true }),
    });
    this.handleSearch();
  }

  private handleSearch() {
    this.form.valueChanges
      .pipe(
        debounceTime(300),
        tap((formValue) => {
          this.country = formValue.country || '';
          this.search = formValue.search || '';
          this.searchTour({ search: this.search, filter: this.country });
        })
      )
      .subscribe();
  }

  private searchTour(param?: IBaseParams) {
    this.isLoading = true;
    this.tourFacade.getAll(param).subscribe(() => (this.isLoading = false));
  }
}
