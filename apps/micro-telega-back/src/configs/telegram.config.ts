import { TelegrafModuleOptions } from "nestjs-telegraf";

import { BotModule } from "src/bot/bot.module";
import { sessionMiddleware } from "src/common/middleware/session.middleware";
import { getTelegramToken } from "./envs/envs.get";
import { TelegramBotName } from "src/bot/bot.constants";


export const telegramConfig = ():TelegrafModuleOptions => {
  return{
  botName: TelegramBotName,
  token: process.env.TELEGRAM_TOKEN + '/test',
  //middlewares: [sessionMiddleware],
  include: [BotModule],
  
}};

/* 
export const telegramAsyncOptions = (): TelegrafModuleAsyncOptions => ({
  imports: [ConfigModule],

  useFactory: (config: ConfigService) => {
    console.log({ config })
    return {
      botName: TELEGRAF_BOT_NAME,
      middlewares: [sessionMiddleware],
      include: [BotModule],
      token: getTelegramToken(),
    };
  },
}); */
