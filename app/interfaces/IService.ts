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
