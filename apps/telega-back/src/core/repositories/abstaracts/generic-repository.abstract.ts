import { DeepPartial, FindOptionsWhere } from 'typeorm';

export type Where<T> = FindOptionsWhere<T> | FindOptionsWhere<T>[];

export abstract class IGenericRepository<T> {
  abstract getAll(): Promise<T[]>;

  abstract get(where: Where<T>): Promise<T>;

  abstract getById(id: any): Promise<T>;

  abstract create(item: T): Promise<T>;
  abstract create(item: DeepPartial<T>): Promise<T>;
  abstract createUniq(item: DeepPartial<T>, where: Where<T>): Promise<T>;

  abstract update(id: string, item: T);
}
