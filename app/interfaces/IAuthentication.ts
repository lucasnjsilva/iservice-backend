export enum IAccountType {
  customer = 'customer',
  provider = 'provider',
}

export interface IAuthenticate {
  email: string;
  password: string;
  type: IAccountType | string;
}
