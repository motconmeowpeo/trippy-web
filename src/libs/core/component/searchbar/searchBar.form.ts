import { FormControl } from '@angular/forms';

export interface ISearchForm {
  country: FormControl<string>;
  state: FormControl<string>;
  search: FormControl<string>;
}
