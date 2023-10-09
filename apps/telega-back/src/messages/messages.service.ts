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

  async new(message: Message.CommonMessage): Promise<Telega.Message> {
    const { message_id } = message;
    const exist = await this.messages.findOneBy({ message_id });
    if (exist) {
      throw new Error(`The message id = ${message_id} was already created`);
    }

    const messageForSaving = this.messages.create({ ...message });
    const createdMessage = await this.messages.save(messageForSaving);
    this.logger.log(
      `CREATED new message successfully! with id = ${message_id}`,
    );
    return createdMessage;
  }
}
