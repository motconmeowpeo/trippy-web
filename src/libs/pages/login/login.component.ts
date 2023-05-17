import { Component, OnInit } from '@angular/core';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import { Validators, FormControl } from '@angular/forms';
import { EMAIL_REG_EXP, PASSWORD_REG_EXP, USER_REG_EXP } from '@core/constants';
import { of, tap } from 'rxjs';
import { RoleFacade } from 'src/libs/core/services/role/role.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  faStarOfLife = faStarOfLife;
  emailMessage: string = '';
  passwordMessage: string = '';
  constructor() {}

  ngOnInit() {}
  handleValidate(value: string, field: string) {
    if (field === 'email') {
      const emailController = new FormControl(value, [
        Validators.required,
        Validators.pattern(EMAIL_REG_EXP),
      ]);
      if (emailController.errors?.['required']) {
        this.emailMessage = 'is required field';
      } else {
        if (emailController.status === 'INVALID') {
          this.emailMessage = 'is invalid';
        } else {
          this.emailMessage = '';
        }
      }
    } else if (field === 'password') {
      const passwordController = new FormControl(value, [
        Validators.required,
        Validators.pattern(PASSWORD_REG_EXP),
      ]);
      if (passwordController.errors?.['required']) {
        this.passwordMessage = 'is required field';
      } else {
        if (PASSWORD_REG_EXP.test(value)) {
          this.passwordMessage = 'is invalid';
        } else {
          this.passwordMessage = '';
        }
      }
    }
  }
}
