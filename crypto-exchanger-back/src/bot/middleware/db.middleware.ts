import { ExecutionContext, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { Observable } from "rxjs";
import { BotUsersService } from "src/users/bot-users.service";

// TODO set the type middleware in telegraf-options.interface.ts in nestjs-telegraf
// TODO see the telegra-session-reids what does it return?

@Injectable()
export class DBMiddleware implements NestMiddleware {

  constructor(private readonly userService: BotUsersService) {}
  async use(context: ExecutionContext, next: NextFunction) {
    console.log('*** middleware')
    console.log(context);

    next();
  }
}