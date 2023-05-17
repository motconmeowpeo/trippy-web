import { Validators } from '@angular/forms';
import { EMAIL_REG_EXP, USER_REG_EXP } from '@core/constants';
import { IAuthCredential } from '@core/model';
import { FormGroup, FormControl } from 'ngx-strongly-typed-forms';

export type ILoginForm = IAuthCredential;

export const createForm = ({
  email,
  password,
  username,
}: ILoginForm): FormGroup<ILoginForm> =>
  new FormGroup({
    email: new FormControl(email, [
      Validators.required,
      Validators.pattern(EMAIL_REG_EXP),
    ]),
    password: new FormControl(password, [Validators.required]),
    username: new FormControl(username, [
      Validators.required,
      Validators.pattern(USER_REG_EXP),
    ]),
  });
