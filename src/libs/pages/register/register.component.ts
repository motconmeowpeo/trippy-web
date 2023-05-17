import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EMAIL_REG_EXP, USER_REG_EXP } from '@core/constants';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import { PASSWORD_REG_EXP } from '../../core/constants/regex.constant';
import { RoleFacade } from '@core/services';
import { tap } from 'rxjs';
import { RoleCode } from 'src/libs/core/enum/role-code.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  faStarOfLife = faStarOfLife;
  userNameMessage: string = '';
  emailMessage: string = '';
  passwordMessage: string = '';
  confirmPasswordMessage: string = ' ';
  roles$ = this.roleFacade.roles$;
  RoleCode = RoleCode;

  constructor(private roleFacade: RoleFacade) {}

  ngOnInit() {
    this.roleFacade.getAllRole().subscribe();
  }
  handleValidate(value: string, field: string) {
    if (field === 'username') {
      const userNameController = new FormControl(value, [
        Validators.required,
        Validators.pattern(USER_REG_EXP),
      ]);

      if (userNameController.errors?.['required']) {
        this.userNameMessage = 'is required field';
      } else {
        if (userNameController.status === 'INVALID') {
          this.userNameMessage =
            'include letters and numbers, at least 6 letter';
        } else {
          this.userNameMessage = '';
        }
      }
    } else if (field === 'email') {
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
        if (!PASSWORD_REG_EXP.test(value)) {
          this.passwordMessage =
            'at least eight characters, one uppercase letter, one number';
        } else {
          this.passwordMessage = '';
        }
      }
    }
  }

  confirmPwd(passWord: string, confirm: string) {
    if (passWord !== confirm) {
      this.confirmPasswordMessage = 'Confirm password invalid';
    } else {
      this.confirmPasswordMessage = '';
    }
  }
}
