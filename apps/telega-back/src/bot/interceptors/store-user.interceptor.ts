import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { TelegrafExecutionContext } from 'nestjs-telegraf';

import { UpdatesService } from 'src/updates/updates.service';
import { TgContext } from '../bot.types';
//import { Context } from '../../common/interfaces/context.interface';

// TODO 'Add redis for check existed users'

@Injectable()
export class StoreUserInterceptor implements NestInterceptor {
  constructor(private readonly updatesService: UpdatesService) {}
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log('** interceptor **');
    const ctx = TelegrafExecutionContext.create(context);
    const tgContext = ctx.getContext<TgContext>();
    const { update /* , chat, message, from */ } = tgContext;
    this.updatesService.new(update);

    return next.handle();
  }
}
