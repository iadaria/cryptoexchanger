import { Start, Update } from "nestjs-telegraf";
import { Telegraf } from "telegraf";
import { BotService } from "./bot.service";
import { Context } from "./interfaces/context.interface";

@Update()
export class BotUpdate {
    constructor(
       private readonly bot: Telegraf<Context>,
       private readonly botService: BotService,
    ) {}

    @Start()
    async onStart(): Promise<string> {
        const me = await this.bot.telegram.getMe();
        return `Hey, ${me.username}`;
    }
}