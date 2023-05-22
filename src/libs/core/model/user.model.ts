export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  active: boolean;
}
export interface ICreateUser {
  username: string;
  email: string;
  password: string;
  roleId: string;
  active: boolean;
}
