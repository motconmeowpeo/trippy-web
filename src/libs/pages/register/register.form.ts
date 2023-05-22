import { FormControl, FormGroup } from '@angular/forms';

export interface IRegisterForm {
  username: FormControl<string>;
  email: FormControl<string>;
  roleId: FormControl<string>;
  password: FormControl<string>;
  active: FormControl<boolean>;
}
