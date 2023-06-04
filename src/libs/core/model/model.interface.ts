export interface IDestination {
  name: string;
  img: string;
  radius: boolean;
  width: string;
  dataaos: string;
}
export interface IAuth extends IToken {
  user: User | null;
}
export interface IToken {
  accessToken: string | null;
}

export interface User {
  username: string;
  email: string;
  active: boolean;
  userRole: string;
  code: number;
}
