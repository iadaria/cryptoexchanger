import { ExecutionContext, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { Observable } from 'rxjs';
import { BotUsersService } from 'src/bot/users/bot-users.service';
import { Context, Middleware, MiddlewareFn } from 'telegraf';

// TODO set the type middleware in telegraf-options.interface.ts in nestjs-telegraf
// TODO see the telegra-session-reids what does it return?

@Injectable()
export class DbMiddleware implements NestMiddleware {
  constructor(private readonly userService: BotUsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    //console.log('*** DbMiddleware ***');
    //console.log(req);
    next();
  }
}

/* export const dbMiddleware: MiddlewareFn<any> = (ctx: Context, next: () => Promise<void>) => {
  console.log('*** middleware');
  console.log(ctx);
  return next();
}; */

/* @Injectable()
export class DBMiddleware implements NestMiddleware {

  constructor(private readonly userService: BotUsersService) {}
  async use(context: ExecutionContext, next: NextFunction) {
    console.log('*** middleware')
    console.log(context);

    next();
  }
} */
