import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  faCompass,
  faPhone,
  faEnvelopeOpen,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { IContactForm } from './contact.form';
import { EMAIL_REG_EXP, USER_REG_EXP } from '@core/constants';
import { ContactFacade } from '@core/services/contact';
import { tap, catchError, of } from 'rxjs';
import { AuthFacade, ToastNotificationService } from '@core/services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  faCompass = faCompass;
  faEnvelopeOpen = faEnvelopeOpen;
  faPhone = faPhone;
  faClock = faClock;
  form!: FormGroup<IContactForm>;
  isLoading = false;
  user$ = this.authFacade.user$;

  constructor(
    private contactFacade: ContactFacade,
    private authFacade: AuthFacade,
    private toast: ToastNotificationService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = new FormGroup({
      username: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(EMAIL_REG_EXP)],
      }),
      message: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  create() {
    this.isLoading = true;
    this.contactFacade
      .createContact({ ...this.form.value })
      .pipe(
        tap(() => {
          this.isLoading = false;
          this.toast.success('Success', 'Created contact');
          this.form.reset();
        }),
        catchError((err) => {
          this.isLoading = false;
          return of(err);
        })
      )
      .subscribe();
  }
}
