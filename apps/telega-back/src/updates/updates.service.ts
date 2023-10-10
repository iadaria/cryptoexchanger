import { Injectable, Logger } from '@nestjs/common';
import { Telega } from 'orm';
import { Update as TelegrafUpdate } from 'telegraf/typings/core/types/typegram';
import { IDataServices } from '@core/repositories/abstaracts/data-services.abstract';

@Injectable()
export class UpdatesService {
  private logger = new Logger('telega.back.' + UpdatesService.name);

  constructor(private repo: IDataServices) {}

  async new(updateInput: TelegrafUpdate): Promise<Telega.Update> {
    const { update_id, message: messageInput } =
      updateInput as TelegrafUpdate.MessageUpdate;
    const { from: fromInput, message_id } = messageInput;

    this.logger.log({ update_id, messageInput, fromInput });

    try {
      await this.repo.users.createIfNotExist({ id: fromInput.id }, fromInput);
      await this.repo.messages.createIfNotExist({ message_id }, messageInput);
      return this.repo.updates.createUniq({ update_id }, updateInput);
    } catch (e) {
      this.logger.error("Couldn't create a new Update record", e);
    }
  }
}

/**
 * 
 *   

  async allUpdates() {
    try {
      const updates = await this.updates.find();
      return updates;
    } catch (error) {
      this.logger.error('Couldn"t get updates');
      throw new RpcException('Could not get updates');
    }
 */
