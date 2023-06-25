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
  userId: string;
  total: number;
}
