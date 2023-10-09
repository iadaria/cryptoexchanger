import { FindOptionsWhere } from 'typeorm';

export abstract class IGenericRepository<T> {
  abstract getAll(): Promise<T[]>;

  abstract get(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T>;

  abstract getById(id: any): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T);
}
