export interface ICreateCustomer {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export interface IUpdateCustomer {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
}
