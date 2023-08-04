import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { TelegrafExecutionContext } from 'nestjs-telegraf';

import { Context } from '../../common/interfaces/context.interface';
import { UsersService } from '../../users/users.service';

// TODO 'Add redis for check existed users'

@Injectable()
export class StoreUserInterceptor implements NestInterceptor {
  constructor(private readonly botUsersService: UsersService) {}
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log('** interceptor **');
    const ctx = TelegrafExecutionContext.create(context);
    const hz = ctx.getContext<Context>();
    const { from, update, chat } = hz;
    console.log({ from, update, chat });
    await this.botUsersService.newUser(from);

    //const result = ctx.getContext<Context>();
    //console.log( { result})
    return next.handle();
  }
}
