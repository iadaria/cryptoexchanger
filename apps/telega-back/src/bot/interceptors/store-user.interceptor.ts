import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { TelegrafExecutionContext } from 'nestjs-telegraf';

import { UpdatesService } from 'src/updates/updates.service';
import { TgContext } from '../bot.types';
import { toCamel, toCamelObj } from '@core/utils/transform';
import { Telega } from 'orm';
//import { Context } from '../../common/interfaces/context.interface';

// TODO 'Add redis for check existed users''
//github.com/DestinyItemManager/dim-api/blob/377b82785681b17a266f37e9f367a939fc56dcf3/api/utils.ts#L6

@Injectable()
export class StoreUserInterceptor implements NestInterceptor {
  constructor(private readonly updatesService: UpdatesService) {}
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log('** interceptor **');
    const ctx = TelegrafExecutionContext.create(context);
    const tgContext = ctx.getContext<TgContext>();
    const { update: updateInput /* , chat, message, from */ } = tgContext;
    const update = toCamelObj(updateInput);
    console.log({ update });
    this.updatesService.new(update);

    return next.handle();
  }
}
