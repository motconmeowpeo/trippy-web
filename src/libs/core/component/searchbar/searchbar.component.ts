import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);
import { EXPLORES } from '@core/constants';
import { faCalendar, faUser } from '@fortawesome/free-regular-svg-icons';
import { LocationFacade } from '@core/services';
import {
  faLocationDot,
  faChevronDown,
  faMagnifyingGlass,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from '@core/base';
import { IBaseParams, ISelectItem } from '@core/model';
import { tap, debounceTime } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISearchForm } from './searchBar.form';
import { DialogService } from '@ngneat/dialog';
import { TestModal } from '@core/ui/modal/test';
import { debounce } from 'lodash';
import { TourFacade } from '../../services/tour/tour.facade';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
})
export class SearchbarComponent extends BaseComponent implements OnInit {
  faLocationDot = faLocationDot;
  faChevronDow = faChevronDown;
  faCalendar = faCalendar;
  faUser = faUser;
  faSearch = faMagnifyingGlass;
  faClear = faCircleXmark;

  destinationValue: string = 'Where are you going ?';
  dateValue: Date | string = 'Date from';
  adultNumber: number = 0;
  youthNumber: number = 0;
  childrenNumber: number = 0;
  canClearInput = false;
  selectCountry: ISelectItem[] = [];
  selectState: ISelectItem[] = [];
  form!: FormGroup<ISearchForm>;
  isShowGuests = false;
  minDate: any;
  search!: string;
  country!: string;
  constructor(
    private locationfacade: LocationFacade,
    private tourFacade: TourFacade,
    private dialog: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.isLoading = true;
    this.locationfacade
      .getAllLocation()
      .pipe(
        tap((locations) => {
          this.selectCountry = locations.map((location) => {
            return {
              name: location.name,
              value: location.iso2,
            };
          });
          this.isLoading = false;
        })
      )
      .subscribe();
    this.createForm();
  }

  onInput() {
    this.canClearInput = true;

    // if (this.explore.includes(this.destinationValue)) {
    //   console.log(this.destinationValue);
    // }
  }

  clearInput() {
    this.canClearInput = false;
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
