import { Tg } from 'orm';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract users: IGenericRepository<Tg.User>;

  abstract messages: IGenericRepository<Tg.Message>;

  abstract updates: IGenericRepository<Tg.Update>;
}
