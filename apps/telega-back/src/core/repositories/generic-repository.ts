import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import {
  IGenericRepository,
  Where,
} from './abstaracts/generic-repository.abstract';

interface Entity {
  [key: string]: any;
}

export class GenericRepository<T extends Entity>
  implements IGenericRepository<T>
{
  private _repository: Repository<T>;
  private _relations: string[];

  constructor(repository: Repository<T>, relations: string[] = []) {
    this._repository = repository;
    this._relations = relations;
  }
  getAll(): Promise<T[]> {
    return this._repository.find({ relations: this._relations });
  }
  get(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T> {
    return this._repository.findOne({ where, relations: this._relations });
  }
  getById(id: any): Promise<T> {
    return this._repository.findOne({
      where: { id },
      relations: this._relations,
    });
  }
  async create(item: DeepPartial<T>): Promise<T> {
    const entityRaw = this._repository.create(item);
    return this._repository.save(entityRaw);
  }

  async createUniq(item: DeepPartial<T>, where: Where<T>): Promise<T> {
    let entity = await this._repository.findOne({ where });
    if (entity) {
      throw new Error(
        `The Entity with ${JSON.stringify(where)} was already created`,
      );
    }
    return this.create(item);
  }

  update(id: string, item: T) {
    return this._repository.update(id, item);
  }
}
