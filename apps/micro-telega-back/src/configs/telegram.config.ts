import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModuleAsyncOptions } from 'nestjs-telegraf';
import { BotModule } from 'src/bot/bot.module';
import { TelegramBotName } from 'src/common/common.constants';
import { sessionMiddleware } from 'src/common/middleware/session.middleware';

export const telegramAsyncOptions = (): TelegrafModuleAsyncOptions => ({
  imports: [ConfigModule],

  useFactory: (config: ConfigService) => ({
    botName: TelegramBotName,
    middlewares: [sessionMiddleware],
    include: [BotModule],
    token: config.get('TELEGRAM_TOKEN'),
  }),
});
