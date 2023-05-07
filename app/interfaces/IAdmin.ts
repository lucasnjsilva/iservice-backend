export interface ICreateAdmin {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export interface IUpdateAdmin {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
}
