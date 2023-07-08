import { TELEGRAF_BOT_NAME, TelegrafModuleAsyncOptions } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { BotModule } from 'src/bot/bot.module';
import { sessionMiddleware } from 'src/common/middleware/session.middleware';

export const telegramAsyncOptions = (): TelegrafModuleAsyncOptions => ({
  imports: [ConfigModule],
  botName: TELEGRAF_BOT_NAME,
  useFactory: (config: ConfigService) => {
    console.log({ config });
    return {
      middlewares: [sessionMiddleware],
      include: [BotModule],
      token: config.get<string>('TELEGRAM_TOKEN'),
      options: {
        telegram: {
          testEnv: config.get<boolean>('TELEGRAM_TEST'),
        },
      },
    };
  },
  inject: [ConfigService],
});
