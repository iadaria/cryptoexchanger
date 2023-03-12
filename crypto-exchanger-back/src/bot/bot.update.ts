import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { Command, Ctx, Hears, Help, InjectBot, Message, On, Sender, Start, Update } from 'nestjs-telegraf';
import { Input, Telegraf } from 'telegraf';
import { UpdateType as TelegrafUpdateType } from 'telegraf/typings/telegram-types';
import { HELLO_SCENE_1, MENU_MAIN, TelegramBotName } from './bot.constants';
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
  async onStart(@Ctx() ctx: Context): Promise<void> {
    await ctx.scene.enter(MENU_MAIN);
    
    //await ctx.replyWithSticker('123123jkbhj6b');
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
    const me = await this.bot.telegram.getMe();
    console.log('command scene ' + me.username)
    //console.log(ctx.scene);
    //console.log(this.bot.context.scene);
      await ctx.scene.enter(HELLO_SCENE_1);
  }

  @On('text')
  onMessage(@Message('text', new ReverseTextPipe()) reversedText: string): string {
    console.log('text and echo')
    return this.botService.echo(reversedText);
  }
  
}
