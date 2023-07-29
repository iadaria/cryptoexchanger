import {
  Action,
  Command,
  Ctx,
  Hears,
  Scene,
  SceneEnter,
  SceneLeave,
  Sender,
} from 'nestjs-telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';

import { MENU_MAIN } from '../bot.constants';
import { Context } from '../interfaces/context.interface';

@Scene(MENU_MAIN)
export class MenuMainScene {
  @SceneEnter()
  async onSceneEnter(ctx: Context) {
    const first_name = ctx.from?.first_name;
    //console.log({ first_name})
    await ctx.reply(`${first_name}, Welcome to the main menu`, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Wallet', callback_data: 'wallet' },
            { text: 'Settings', callback_data: 'settings' },
          ],
        ],
      },
    });
  }

  @Action(/4|5/)
  async onAnswer(@Ctx() context: SceneContext & { update: Update.CallbackQueryUpdate }) {
    const cbQuery = context.update.callback_query;
    const userAnswer = 'data' in cbQuery ? cbQuery.data : null;

    if (userAnswer === '4') {
      context.reply('верно!');
    } else {
      context.reply('подумай еще');
    }
  }

  @SceneLeave()
  onSceneLeave(): void {
    console.log('User leave the MAIN_MENU');
    //return 'Buy buy scene main_menu';
  }

  @Command('leave')
  async onLeaveCommand(ctx: Context): Promise<void> {
    await ctx.scene.leave();
  }

  @Command('hz1')
  async onHZ(ctx: Context): Promise<void> {
    await ctx.reply('2+2 = ?', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Может быть 4?', callback_data: '4' }],
          [{ text: 'Точно пять!', callback_data: '5' }],
        ],
      },
    });
  }

  @Hears(['hi', 'hello', 'hey', 'qq'])
  onGreetings(@Sender('first_name') firstName: string): string {
    return `scene1: Hey ${firstName}`;
  }
}
