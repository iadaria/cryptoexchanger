import { Injectable, Logger } from '@nestjs/common';
import { Telega } from 'orm';
import { Update as TelegrafUpdate } from 'telegraf/typings/core/types/typegram';
import { IDataServices } from 'src/core/repositories/abstaracts/data-services.abstract';

@Injectable()
export class UpdatesService {
  private logger = new Logger('telega.back.' + UpdatesService.name);

  constructor(private dataService: IDataServices) {}

  async newUpdate(updateInput: TelegrafUpdate): Promise<Telega.Update> {
    const { update_id } = updateInput;
    try {
      const exist = await this.dataService.updates.get({ update_id });
      if (exist) {
        throw new Error(`The Update id = ${update_id} was already created`);
      }
      this.logger.log('All is OK');
    } catch (e) {
      this.logger.error("Couldn't create a new Update record", e);
    }
    return null;
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
