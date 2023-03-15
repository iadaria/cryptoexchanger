import { ConfigModule, ConfigService } from "@nestjs/config";
import { TelegrafModuleAsyncOptions, TelegrafModuleOptions } from "nestjs-telegraf";
import { TelegramBotName } from "src/bot/bot.constants";
import { BotModule } from "src/bot/bot.module";
import { DBMiddleware } from "src/bot/middleware/db.middleware";
import { sessionMiddleware } from "src/bot/middleware/session.middleware";
import { ITelegramOptions } from "src/telegram/telegram.interface";

export const telegramConfig = ():TelegrafModuleOptions => ({
    botName: TelegramBotName,
    token: process.env.TELEGRAM_TOKEN,
    middlewares: [sessionMiddleware],
    include: [BotModule],
});

export const getTelegramConfig = (configService: ConfigService): ITelegramOptions => {
    const token = configService.get('TELEGRAM_TOKEN');
    if (!token) {
        throw new Error('TELEGRAM_TOKEN is not defined!')
    }
    return {
        token, //: process.env.TOKEN_BOT,
        chatId: configService.get('CHAT_ID') ?? ''
    }
}

export const telegramAsyncConfig = (): TelegrafModuleAsyncOptions => ({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
        botName: TelegramBotName,
        token: configService.get('TELEGRAM_TOKEN'),
        middlewares: [sessionMiddleware, DBMiddleware],
        include: [BotModule]
    }),
    inject: [ConfigService],
})
