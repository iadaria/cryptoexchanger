import { TelegrafModuleAsyncOptions, TelegrafModuleOptions } from "nestjs-telegraf";

import { BotModule } from "src/bot/bot.module";
import { sessionMiddleware } from "src/common/middleware/session.middleware";
import { getTelegramToken } from "./envs/envs.get";
import { TelegramBotName } from "src/bot/bot.constants";
import { ConfigModule, ConfigService } from "@nestjs/config";


export const telegramConfig = ():TelegrafModuleOptions => {
  return{
  botName: 'test',
  token: "5000566046:AAHU9EuiHr1yWVg6V1-RXKTel6cSOTQZlfs/test",
  middlewares: [sessionMiddleware],
  include: [BotModule],
}};


export const telegramAsyncOptions = (): TelegrafModuleAsyncOptions => ({
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => {
    console.log({ config })
    return {
      //botName: 'testBot',
      middlewares: [sessionMiddleware],
      include: [BotModule],
      token: config.get<string>('TELEGRAM_TOKEN'),
      options: {
        telegram: {
          testEnv: config.get<boolean>('TELEGRAM_TEST')
        }
      }
    };
  },
  inject: [ConfigService]
});
