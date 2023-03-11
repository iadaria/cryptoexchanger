import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { Command, Ctx, Hears, Help, InjectBot, Message, On, Sender, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { UpdateType as TelegrafUpdateType } from 'telegraf/typings/telegram-types';
import { HELLO_SCENE_1, TelegramBotName } from './bot.constants';
import { BotService } from './bot.service';
import { UpdateType } from './decorators/update-type.decorator';
import { TelegrafExceptionFilter } from './filters/telegraf-exception.filter';
import { AdminGuard } from './guards/admin.guard';
import { ResponseTimeInterceptor } from './interceptors/response-time.interceptor';
import { Context } from './interfaces/context.interface';
import { ReverseTextPipe } from './pipes/reverse-text.pipe';

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

  @Hears(['hi', 'hello', 'hey', 'qq'])
  onGreetings(
    @UpdateType() updateType: TelegrafUpdateType,
    @Sender('first_name') firstName: string,
  ): string {
    console.log(updateType);
    return `Hey ${firstName}`;
  }

  @Command('scene')
  async onSceneCommand(@Ctx() ctx: Context): Promise<void> {
    //console.log(ctx.scene);
    //console.log(this.bot.context.scene);
      await ctx.scene.enter(HELLO_SCENE_1);
  }

  @On('text')
  onMessage(@Message('text', new ReverseTextPipe()) reversedText: string): string {
    return this.botService.echo(reversedText);
  }
  
}
