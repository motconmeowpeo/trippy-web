import { FormControl } from '@angular/forms';

export interface IContactForm {
  username: FormControl<string>;
  email: FormControl<string>;
  message: FormControl<string>;
}
