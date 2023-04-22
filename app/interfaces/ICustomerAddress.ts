export interface ICreateCustomerAddress {
  address: string;
  number?: string;
  neighborhood: string;
  complement?: string;
  reference?: string;
  city: string;
  uf: string;
  cep: string;
}

export interface IUpdateCustomerAddress {
  address?: string;
  number?: string;
  neighborhood?: string;
  complement?: string;
  reference?: string;
  city?: string;
  uf?: string;
  cep?: string;
}
