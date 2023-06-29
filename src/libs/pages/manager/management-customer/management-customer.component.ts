import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ISearchForm } from './management-customer.form';
import { AuthFacade, UserFacade } from '@core/services';
import { debounceTime, tap } from 'rxjs';
import { IBaseParams } from '@core/model';

@Component({
  selector: 'app-management-customer',
  templateUrl: './management-customer.component.html',
})
export class ManagementCustomerComponent implements OnInit {
  isLoading = false;
  form!: FormGroup<ISearchForm>;
  users$ = this.userFacade.users$;
  author$ = this.authFacade.user$;
  search = '';
  constructor(private userFacade: UserFacade, private authFacade: AuthFacade) {}

  ngOnInit() {
    this.isLoading = true;
    this.createForm();
    this.author$.subscribe((user) => {
      if (user)
        this.userFacade.getAllUserByManager(user.id).subscribe((user) => {
          this.isLoading = false;
        });
    });
  }

  private createForm() {
    this.form = new FormGroup({
      search: new FormControl('', { nonNullable: true }),
    });
    this.handleSearch();
  }

  private handleSearch() {
    this.form.valueChanges
      .pipe(
        debounceTime(300),
        tap((formValue) => {
          this.search = formValue.search || '';
          this.searchTour({ search: this.search });
        })
      )
      .subscribe();
  }

  private searchTour(params?: IBaseParams) {
    // this.isLoading = true;
    // this.user$.subscribe((user) => {
    //   if (user) {
    //     this.tourFacade
    //       .getTourByManager(user?.id, params)
    //       .subscribe(() => (this.isLoading = false));
    //   }
    // });
  }
}
