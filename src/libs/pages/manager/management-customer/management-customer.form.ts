import { FormControl } from '@angular/forms';

export interface ISearchForm {
  search: FormControl<string>;
  filter: FormControl<string>;
}
