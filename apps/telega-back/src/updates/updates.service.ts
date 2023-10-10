import { Injectable, Logger } from '@nestjs/common';
import { Telega } from 'orm';
import { Update as TelegrafUpdate } from 'telegraf/typings/core/types/typegram';
import { IDataServices } from 'src/core/repositories/abstaracts/data-services.abstract';

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
      const from = await this.repo.users.createIfNotExist(
        { id: fromInput.id },
        fromInput,
      );
      const message = await this.repo.messages.createIfNotExist(
        { message_id },
        { ...messageInput, from },
      );
      const update = this.repo.updates.createUniq(
        { update_id },
        { ...updateInput, message },
      );
      return update;
    } catch (e) {
      this.logger.error("Couldn't create a new Update record", e);
    }
  }
}

/**
 * 
 *   constructor(
    @InjectRepository(Telega.Update)
    private readonly updates: Repository<Telega.Update>,
  ) {}

  async newUpdate(updateInput: TelegrafUpdate): Promise<Telega.Update> {
    const { update_id } = updateInput;
    try {
      const exist = await this.updates.findOneBy({ update_id });
      if (exist) {
        throw new Error(`The Update id = ${update_id} was already created`);
      }
      const updateForSaving = this.updates.create({ ...updateInput });
      const createdUpdate = await this.updates.save(updateForSaving);
      this.logger.log(`created new update successfully with id = ${update_id}`);
      return createdUpdate;
    } catch (e) {
      this.logger.error("Couldn't create a new Update record", e);
    }
  }

  async allUpdates() {
    try {
      const updates = await this.updates.find();
      return updates;
    } catch (error) {
      this.logger.error('Couldn"t get updates');
      throw new RpcException('Could not get updates');
    }
 */
