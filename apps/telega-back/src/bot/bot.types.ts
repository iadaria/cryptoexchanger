import { Context } from 'telegraf';
import * as tg from 'telegraf/typings/core/types/typegram';
import { Deunionize } from 'telegraf/typings/deunionize';

export type TgUpdate = Deunionize<tg.Update>;

export type TgContext<
  U extends Deunionize<tg.Update> = tg.Update,
  M extends Deunionize<tg.Message> = tg.Message,
> = Context<U> & {
  message: M & { text: string };
  update: U;
  startPayload: string;
  match?: string[];
};
