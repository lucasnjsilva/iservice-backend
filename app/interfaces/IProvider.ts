export interface ICreateProvider {
  email: string;
  password: string;
  name: string;
  phone: string;
  cnpj: string;
}

export interface IUpdateProvider {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  cnpj?: string;
}
