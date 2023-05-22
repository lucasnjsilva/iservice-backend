export interface ICreateService {
  name: string;
  description: string;
  categoryId: string;
  cost: number;
}

export interface IUpdateService {
  name?: string;
  description?: string;
  categoryId?: string;
  cost?: number;
}

export interface IQueryFilters {
  name?: string;
  category?: string;
  uf?: string;
  city?: string;
}
