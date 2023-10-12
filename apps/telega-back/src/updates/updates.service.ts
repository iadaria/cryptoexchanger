import { Injectable, Logger } from '@nestjs/common';
import { Telega } from 'orm';
import * as tg from 'telegraf/typings/core/types/typegram';
import { IDataServices } from '@core/repositories/abstaracts/data-services.abstract';
//import { Deunionize } from 'telegraf/typings/deunionize';

@Injectable()
export class UpdatesService {
  private logger = new Logger('telega.back.' + UpdatesService.name);

  constructor(private repo: IDataServices) {}

  //async new(updateInput: Deunionize<tg.Update>): Promise<Telega.Update> {
  async new(updateInput: Telega.Update): Promise<Telega.Update> {
    const { updateId, message: messageInput } = updateInput;
    const { from: fromInput, messageId } = messageInput;

    this.logger.log({ updateInput });
    //this.logger.log({ update_id, messageInput, fromInput });

    try {
      await this.repo.users.createIfNotExist({ id: fromInput.id }, fromInput);
      await this.repo.messages.createIfNotExist({ messageId }, messageInput);
      return this.repo.updates.createUniq({ updateId }, updateInput);
    } catch (e) {
      this.logger.error("Couldn't create a new Update record", e);
    }
  }
}

/**

  async allUpdates() {
    try {
      const updates = await this.updates.find();
      return updates;
    } catch (error) {
      this.logger.error('Couldn"t get updates');
      throw new RpcException('Could not get updates');
    }
 */
