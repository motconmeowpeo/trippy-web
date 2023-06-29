import { IRole } from './role.model';

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: IRole;
  active: boolean;
}
export interface ICreateUser {
  username: string;
  email: string;
  password: string;
  roleId: string;
  active: boolean;
}

export interface ILogin {
  email: string;
  password: string;
}
