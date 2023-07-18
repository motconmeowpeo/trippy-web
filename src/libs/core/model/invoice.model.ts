import { ITour } from './tour.model';
import { IUser } from './user.model';
import { InvoiceStatus, PayStatus } from '@core/enum';

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
  paid: number;
  payStatus: PayStatus;
}

export interface IUpdateInvoiceCommand {
  id: string;
  paid: number;
  payStatus: PayStatus;
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
  paid: number;
  payStatus: PayStatus;
  createAt: string;
  status: InvoiceStatus;
}
