import { ITour } from './tour.model';
import { IUser } from './user.model';
import { PayStatus } from '../enum/invoice.enum';

export interface IInvoiceCommand {
  date: string;
  children: number;
  young: number;
  adult: number;
  serviceBooking: boolean;
  servicePerson: boolean;
  tourId: string;
  userId: string;
  total: number;
}

export interface IInvoice {
  id: string;
  date: string;
  children: number;
  young: number;
  adult: number;
  serviceBooking: boolean;
  servicePerson: boolean;
  tourId: string;
  user: IUser;
  tour: ITour;
  userId: string;
  total: number;
  payStatus: PayStatus;
}
