import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from './abstaracts/data-services.abstract';
import { Repository } from 'typeorm';
import { Telega } from 'orm';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from './generic-repository';

@Injectable()
export class RepositoryServices
  implements IDataServices, OnApplicationBootstrap
{
  users: GenericRepository<Telega.User>;
  messages: GenericRepository<Telega.Message>;
  updates: GenericRepository<Telega.Update>;

  constructor(
    @InjectRepository(Telega.User)
    private UserRepository: Repository<Telega.User>,
    @InjectRepository(Telega.Update)
    private UpdateRepository: Repository<Telega.Update>,
    @InjectRepository(Telega.Message)
    private MessageRepository: Repository<Telega.Message>,
  ) {}

  onApplicationBootstrap() {
    this.users = new GenericRepository<Telega.User>(this.UserRepository);
    this.messages = new GenericRepository<Telega.Message>(
      this.MessageRepository,
    );
    this.updates = new GenericRepository<Telega.Update>(this.UpdateRepository);
  }
}
