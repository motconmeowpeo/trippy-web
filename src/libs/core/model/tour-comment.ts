import { IUser } from './user.model';

export interface ITourComment {
  id: string;
  content: string;
  authorId: string;
  tourId: string;
  createAt: Date;
  updateAt: Date;
  locationRate: number;
  servicesRate: number;
  priceRate: number;
  roomsRate: number;
  author: IUser;
}

export interface ICreateTourComment {
  content: string;
  locationRate: number;
  servicesRate: number;
  priceRate: number;
  roomsRate: number;
  tourId: string;
}
