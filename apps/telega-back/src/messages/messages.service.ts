import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Telega } from 'orm';
import { Repository } from 'typeorm';
import {
  Message,
  Update as TelegrafUpdate,
} from 'telegraf/typings/core/types/typegram';

@Injectable()
export class MessagesService {
  private logger = new Logger('telega.back.' + MessagesService.name);
  constructor(
    @InjectRepository(Telega.Message)
    private readonly messages: Repository<Telega.Message>,
  ) {}

  //async new(message: Message.CommonMessage): Promise<Telega.Message> {
  async new(message: Telega.Message): Promise<Telega.Message> {
    return null;
  }
}
