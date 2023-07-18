import { FormControl } from '@angular/forms';
import { PayOption } from '@core/enum';
import { ITicketTour } from 'src/libs/core/ui/modal/create-tour-modal/create-tour-modal.form';

export interface ICommentForm {
  content: FormControl<string>;
  locationRate: FormControl<number>;
  servicesRate: FormControl<number>;
  priceRate: FormControl<number>;
  roomsRate: FormControl<number>;
  tourId: FormControl<string>;
}
export interface IInvoiceForm {
  date: FormControl<string>;
  children: FormControl<number>;
  young: FormControl<number>;
  adult: FormControl<number>;
  serviceBooking: FormControl<boolean>;
  servicePerson: FormControl<boolean>;
  tourId: FormControl<string>;
  payOption: FormControl<string>;
}
