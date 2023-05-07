export enum IAccountType {
  customer = 'customer',
  provider = 'provider',
  admin = 'admin',
}

export interface IAuthenticate {
  email: string;
  password: string;
  type: IAccountType | string;
}
