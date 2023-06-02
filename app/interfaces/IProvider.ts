export interface ICreateProvider {
  email: string;
  password: string;
  name: string;
  aboutMe?: string;
  phone: string;
  cnpj: string;
  profileImage?: any;
  address: string;
  number?: string;
  neighborhood: string;
  complement?: string;
  reference?: string;
  city: string;
  uf: string;
  cep: string;
}

export interface IUpdateProvider {
  email?: string;
  password?: string;
  name?: string;
  aboutMe?: string;
  phone?: string;
  cnpj?: string;
  profileImage?: any;
  address?: string;
  number?: string;
  neighborhood?: string;
  complement?: string;
  reference?: string;
  city?: string;
  uf?: string;
  cep?: string;
}

export interface IQueryFilters {
  email?: string;
  name?: string;
  phone?: string;
  cnpj?: string;
  address?: string;
  number?: string;
  neighborhood?: string;
  complement?: string;
  reference?: string;
  city?: string;
  uf?: string;
  cep?: string;
}
