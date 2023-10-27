import { Message, TgUser, Update } from 'orm';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract users: IGenericRepository<TgUser>;

  abstract messages: IGenericRepository<Message>;

  abstract updates: IGenericRepository<Update>;
}
