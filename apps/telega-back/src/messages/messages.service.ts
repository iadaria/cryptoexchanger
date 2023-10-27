import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'orm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  private logger = new Logger('Tg.back.' + MessagesService.name);
  constructor(
    @InjectRepository(Message)
    private readonly messages: Repository<Message>,
  ) {}

  //async new(message: Message.CommonMessage): Promise<Tg.Message> {
  async new(message: Message): Promise<Message> {
    return null;
  }
}
