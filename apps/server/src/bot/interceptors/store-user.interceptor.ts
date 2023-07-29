import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { TelegrafExecutionContext } from 'nestjs-telegraf';

import { Context } from '../interfaces/context.interface';
import { BotUsersService } from '../users/bot-users.service';

// TODO 'Add redis for check existed users'

@Injectable()
export class StoreUserInterceptor implements NestInterceptor {
  constructor(private readonly botUsersService: BotUsersService) {}
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    //console.log('** interceptor **')
    const ctx = TelegrafExecutionContext.create(context);
    console.log('***');
    const { from, message } = ctx.getContext<Context>();
    console.log({ message });
    //console.log({ from })
    await this.botUsersService.newUser(from);

    //const result = ctx.getContext<Context>();
    //console.log( { result})
    return next.handle();
  }
}
