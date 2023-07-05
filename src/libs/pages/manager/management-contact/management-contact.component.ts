import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DEFAULT_FORMAT_DATE } from '@core/constants';
import { ContactStatus } from '@core/enum';
import { IBaseParams, ISelectItem } from '@core/model';
import { ContactFacade } from '@core/services/contact';
import { format } from 'date-fns';
import { ISearchForm } from './management-contact.form';
import { debounceTime, tap } from 'rxjs';

@Component({
  selector: 'app-management-contact',
  templateUrl: './management-contact.component.html',
})
export class ManagementContactComponent implements OnInit {
  isLoading = false;
  contacts$ = this.contactFacade.contacts$;
  ContactStatus = ContactStatus;
  FILTER_LIST: ISelectItem[] = [
    { name: 'All Status', value: '' },
    { name: 'Resolved', value: ContactStatus.RESOLVED },
    { name: 'Rejected', value: ContactStatus.REJECTED },
    { name: 'Pending', value: ContactStatus.PENDING },
  ];
  form!: FormGroup<ISearchForm>;
  search = '';
  filter = '';
  constructor(private contactFacade: ContactFacade) {}

  ngOnInit() {
    this.isLoading = true;
    this.contactFacade
      .getAllContactByManager()
      .subscribe(() => (this.isLoading = false));
    this.createForm();
  }

  formatDate(date: string | Date) {
    return format(new Date(date), DEFAULT_FORMAT_DATE);
  }

  resolveContact(id: string) {
    this.contactFacade.changeStatus(id, ContactStatus.RESOLVED).subscribe();
  }

  rejectContact(id: string) {
    this.contactFacade.changeStatus(id, ContactStatus.REJECTED).subscribe();
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
          this.filter = formValue.filter || '';
          this.search = formValue.search || '';
          this.searchContact({ search: this.search, filter: this.filter });
        })
      )
      .subscribe();
  }

  private searchContact(param?: IBaseParams) {
    this.isLoading = true;
    this.contactFacade
      .getAllContactByManager(param)
      .subscribe(() => (this.isLoading = false));
  }
}
