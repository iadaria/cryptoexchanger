import { Context } from 'telegraf';
import * as tgf from 'telegraf/typings/core/types/typegram';
import { Deunionize } from 'telegraf/typings/deunionize';

export type TgUpdate = Deunionize<tgf.Update>;

export type TgContext<
  U extends Deunionize<tgf.Update> = tgf.Update,
  M extends Deunionize<tgf.Message> = tgf.Message,
> = Context<U> & {
  message: M & { text: string };
  update: U;
  startPayload: string;
  match?: string[];
};
