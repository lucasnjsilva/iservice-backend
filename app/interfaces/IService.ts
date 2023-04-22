export interface ICreateService {
  name: string;
  description: string;
  type: string;
  cost: number;
}

export interface IUpdateService {
  name?: string;
  description?: string;
  type?: string;
  cost?: number;
}
