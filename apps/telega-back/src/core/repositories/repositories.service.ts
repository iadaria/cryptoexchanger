import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tg } from 'orm';

import { IDataServices } from './abstaracts/data-services.abstract';
import { GenericRepository } from './generic-repository';

@Injectable()
export class RepositoryServices
  implements IDataServices, OnApplicationBootstrap
{
  users: GenericRepository<Tg.User>;
  messages: GenericRepository<Tg.Message>;
  updates: GenericRepository<Tg.Update>;

  constructor(
    @InjectRepository(Tg.User)
    private UserRepository: Repository<Tg.User>,
    @InjectRepository(Tg.Update)
    private UpdateRepository: Repository<Tg.Update>,
    @InjectRepository(Tg.Message)
    private MessageRepository: Repository<Tg.Message>,
  ) {}

  onApplicationBootstrap() {
    this.users = new GenericRepository<Tg.User>(this.UserRepository);
    this.messages = new GenericRepository<Tg.Message>(this.MessageRepository, [
      'from',
    ]);
    this.updates = new GenericRepository<Tg.Update>(this.UpdateRepository, [
      'message',
    ]);
  }
}
