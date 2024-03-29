import { ContactStatus } from '../enum/contact.enum';

export interface IContact {
  id: string;
  username: string;
  email: string;
  message: string;
  createAt: string;
  status: ContactStatus;
  new: boolean;
}

export interface ICreateContact {
  username: string;
  email: string;
  message: string;
  userId: string;
}
