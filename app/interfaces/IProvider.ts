export interface ICreateProvider {
  email: string;
  password: string;
  name: string;
  phone: string;
  cnpj: string;
  profileImage?: any;
}

export interface IUpdateProvider {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  cnpj?: string;
  profileImage?: any;
}
