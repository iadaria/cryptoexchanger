import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { TelegrafExecutionContext } from 'nestjs-telegraf';

import { Context } from '../../common/interfaces/context.interface';
import { UpdatesService } from 'src/updates/updates.service';

// TODO 'Add redis for check existed users'

@Injectable()
export class StoreUserInterceptor implements NestInterceptor {
  constructor(private readonly updatesService: UpdatesService) {}
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log('** interceptor **');
    const ctx = TelegrafExecutionContext.create(context);
    const hz = ctx.getContext<Context>();
    const { from, update, chat, message } = hz;
    console.log({ from, update, chat, message });
    this.updatesService.new(update);

    return next.handle();
  }
}
