import { FormControl } from '@angular/forms';

export interface ICommentForm {
  content: FormControl<string>;
  locationRate: FormControl<number>;
  servicesRate: FormControl<number>;
  priceRate: FormControl<number>;
  roomsRate: FormControl<number>;
  tourId: FormControl<string>;
}
