import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISearchForm } from './management-customer.form';
import { AuthFacade, UserFacade } from '@core/services';
import { debounceTime, tap, filter } from 'rxjs';
import { IBaseParams, ISelectItem } from '@core/model';
import { STATUS } from '@core/enum';

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
  filter = '';
  FILTER_LIST: ISelectItem[] = [
    { name: 'All Status', value: '' },
    { name: 'Active', value: STATUS.ACTIVE },
    { name: 'Inactive', value: STATUS.INACTIVE },
  ];
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
      filter: new FormControl('', {
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
          this.search = formValue.search || '';
          this.filter = formValue.filter || '';
          this.searchCustomer({ search: this.search, filter: this.filter });
        })
      )
      .subscribe();
  }

  private searchCustomer(params?: IBaseParams) {
    this.isLoading = true;
    this.author$.subscribe((user) => {
      if (user)
        this.userFacade
          .getAllUserByManager(user.id, params)
          .subscribe((user) => {
            this.isLoading = false;
          });
    });
  }
}
