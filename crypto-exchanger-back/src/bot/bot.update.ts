import { UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { Command, Help, InjectBot, Message, On, Start, Update } from "nestjs-telegraf";
import { Telegraf } from "telegraf";
import { TelegramBotName } from "./bot.constants";
import { BotService } from "./bot.service";
import { TelegrafExceptionFilter } from "./filters/telegraf-exception.filter";
import { AdminGuard } from "./guards/admin.guard";
import { ResponseTimeInterceptor } from "./interceptors/response-time.interceptor";
import { Context } from "./interfaces/context.interface";
import { ReverseTextPipe } from "./pipes/reverse-text.pipe";

@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
export class BotUpdate {
    constructor(
        @InjectBot(TelegramBotName)
       private readonly bot: Telegraf<Context>,
       private readonly botService: BotService,
    ) {}

    @Start()
    async onStart(): Promise<string> {
        const me = await this.bot.telegram.getMe();
        return `Hey, ${me.username}`;
    }

    @Help()
    async onHelp(): Promise<string> {
        return 'Send me any text';
    }

    @Command('admin')
    @UseGuards(AdminGuard)
    onAdminCommand(): string {
        return 'Welcome judge';
    }

    @On('text')
    onMessage(
        @Message('text', new ReverseTextPipe()) reversedText: string
    ): string {
        return this.botService.echo(reversedText);
    }
}