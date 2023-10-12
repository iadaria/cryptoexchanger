import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tg } from 'orm';
import { Repository } from 'typeorm';
import {
  Message,
  Update as TelegrafUpdate,
} from 'telegraf/typings/core/types/typegram';

@Injectable()
export class MessagesService {
  private logger = new Logger('Tg.back.' + MessagesService.name);
  constructor(
    @InjectRepository(Tg.Message)
    private readonly messages: Repository<Tg.Message>,
  ) {}

  //async new(message: Message.CommonMessage): Promise<Tg.Message> {
  async new(message: Tg.Message): Promise<Tg.Message> {
    return null;
  }
}
