import { TelegrafModuleOptions } from "nestjs-telegraf";
import { TelegramBotName } from "src/bot/bot.constants";
import { BotModule } from "src/bot/bot.module";
import { sessionMiddleware } from "src/bot/middleware/session.middleware";

export const telegramConfig = ():TelegrafModuleOptions => ({
    botName: TelegramBotName,
    token: process.env.TELEGRAM_TOKEN + '/test',
    middlewares: [sessionMiddleware],
    include: [BotModule],
    
});
