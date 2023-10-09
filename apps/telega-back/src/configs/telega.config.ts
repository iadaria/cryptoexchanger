import { TELEGRAF_BOT_NAME, TelegrafModuleAsyncOptions } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { sessionMiddleware } from 'src/common/middleware/session.middleware';
import { BotModule } from 'src/bot/bot.module';

export const telegramAsyncOptions = (): TelegrafModuleAsyncOptions => ({
  imports: [ConfigModule],
  botName: TELEGRAF_BOT_NAME,
  useFactory: (config: ConfigService) => {
    //console.log({ config });
    return {
      middlewares: [sessionMiddleware],
      include: [BotModule],
      token: config.get<string>('TELEGRAM_TOKEN'),
    };
  },
  inject: [ConfigService],
});
