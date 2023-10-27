import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message, TgUser, Update } from 'orm';

import { IDataServices } from './abstaracts/data-services.abstract';
import { GenericRepository } from './generic-repository';

@Injectable()
export class RepositoryServices
  implements IDataServices, OnApplicationBootstrap
{
  users: GenericRepository<TgUser>;
  messages: GenericRepository<Message>;
  updates: GenericRepository<Update>;

  constructor(
    @InjectRepository(TgUser)
    private UserRepository: Repository<TgUser>,
    @InjectRepository(Update)
    private UpdateRepository: Repository<Update>,
    @InjectRepository(Message)
    private MessageRepository: Repository<Message>,
  ) {}

  onApplicationBootstrap() {
    this.users = new GenericRepository<TgUser>(this.UserRepository);
    this.messages = new GenericRepository<Message>(this.MessageRepository, [
      'from',
    ]);
    this.updates = new GenericRepository<Update>(this.UpdateRepository, [
      'message',
    ]);
  }
}
