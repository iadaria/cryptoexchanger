import { Tg } from 'orm';

type User = Pick<
  Tg.User,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'isPremium'
  | 'lastName'
  | 'username'
  | 'firstName'
>;

type Message = Pick<Tg.Message, 'id' | 'messageId' | 'date' | 'text'> & {
  from?: User;
};

type Update = Pick<Tg.Update, 'id' | 'updateId'> & {
  message?: Message | undefined;
};

export type AllUpdatesOutput = {
  updates: Update[];
};
