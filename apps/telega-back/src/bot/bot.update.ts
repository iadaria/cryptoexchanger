import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Command,
  Ctx,
  Hears,
  Help,
  InjectBot,
  Message,
  On,
  Sender,
  Start,
  TELEGRAF_BOT_NAME,
  Update,
} from 'nestjs-telegraf';
import { StoreUserInterceptor } from 'src/bot/interceptors/store-user.interceptor';
import { Context } from 'src/common/interfaces/context.interface';
import { Telegraf } from 'telegraf';
import { UpdateType as TelegrafUpdateType } from 'telegraf/typings/telegram-types';
import { MENU_MAIN } from './bot.constants';
import { AdminGuard } from 'src/bot/guards/admin.guard';
import { UpdateType } from 'src/bot/decorators/update-type.decorator';
import { ReverseTextPipe } from 'src/bot/pipes/reverse-text.pipe';
import { BotService } from './bot.service';
import { TelegrafExceptionFilter } from 'src/common/filters/telegraf-exception.filter';

@Update()
@UseInterceptors(StoreUserInterceptor)
//@UseFilters(TelegrafExceptionFilter)
export class BotUpdate {
  constructor(
    @InjectBot(TELEGRAF_BOT_NAME) private readonly bot: Telegraf<Context>,
    private readonly botService: BotService,
  ) {}

  @Start()
  async onStart(@Ctx() ctx: Context): Promise<void> {
    console.log(ctx.scene);
    //console.log(ctx.message)
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
    /*     console.log('***')
      console.log(updateType); */
    return `Hey hey ${firstName}`;
  }

  @Command('scene')
  async onSceneCommand(@Ctx() ctx: Context): Promise<void> {
    const me = await this.bot.telegram.getMe();
    await ctx.scene.enter(MENU_MAIN);
  }

  @Hears('bot')
  async onBot(@Ctx() ctx: Context) {
    await ctx.reply('bot', {
      reply_markup: {
        keyboard: [
          [
            {
              text: 'open bot',
              web_app: { url: 'https://bot.iadaria.keenetic.name' },
            },
          ],
        ],
      },
    });
  }

  @On('web_app_data')
  async onActon(@Ctx() ctx: Context) {
    console.log('!!!!', { ctx });

    return 'ok';
  }

  @On('text')
  onMessage(
    @Message('text', new ReverseTextPipe()) reversedText: string,
  ): string {
    //console.log('text and echo')
    return this.botService.echo(reversedText);
  }
}
