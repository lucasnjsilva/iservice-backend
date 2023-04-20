export interface ICreateCustomer {
  email: string;
  password: string;
  name: string;
  phone: string;
  cpf: string;
}

export interface IUpdateCustomer {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  cpf?: string;
}
