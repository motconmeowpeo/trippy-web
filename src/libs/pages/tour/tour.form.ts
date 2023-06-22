import { FormControl } from '@angular/forms';

export interface ISearchForm {
  country: FormControl<string>;
  search: FormControl<string>;
}
