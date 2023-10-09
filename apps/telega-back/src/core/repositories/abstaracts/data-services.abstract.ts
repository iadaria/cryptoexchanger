import { Telega } from 'orm';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract users: IGenericRepository<Telega.User>;

  abstract messages: IGenericRepository<Telega.Message>;

  abstract updates: IGenericRepository<Telega.Update>;
}
