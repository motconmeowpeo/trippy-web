import { Component, OnInit } from '@angular/core';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { EMAIL_REG_EXP, PASSWORD_REG_EXP } from '@core/constants';
import { tap, delay, catchError, of } from 'rxjs';
import * as AOS from 'aos';
import { ILoginForm } from './login.form';
import { AuthFacade } from '@core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  faStarOfLife = faStarOfLife;
  emailMessage: string = '';
  passwordMessage: string = '';
  form!: FormGroup<ILoginForm>;
  isLoading = false;
  isLogin = false;

  constructor(private authFacade: AuthFacade, private router: Router) {}

  ngOnInit() {
    AOS.init({
      duration: 1000,
      once: true,
    });
    this.createForm();
  }

  private createForm() {
    this.form = new FormGroup({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(EMAIL_REG_EXP)],
        updateOn: 'change',
      }),

      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(PASSWORD_REG_EXP)],
        updateOn: 'change',
      }),
    });
  }

  onSubmit() {
    this.isLogin = true;
    this.authFacade
      .loginByEmail(this.form.value)
      .pipe(
        tap(() => {
          this.isLogin = false;
          this.form.reset();
          this.router.navigate(['/']);
        }),
        catchError((err) => {
          this.isLogin = false;
          return of(err);
        })
      )
      .subscribe();
  }
}
