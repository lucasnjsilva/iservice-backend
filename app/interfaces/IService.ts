export interface ICreateService {
  name: string;
  description: string;
  category: string;
  cost: number;
}

export interface IUpdateService {
  name?: string;
  description?: string;
  category?: string;
  cost?: number;
}

export interface IQueryFilters {
  name?: string;
  category?: string;
  uf?: string;
  city?: string;
  my_services?: boolean;
  user?: string;
}
