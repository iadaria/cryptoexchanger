import { TgUser, Message as TgMessage, Update as TgUpdate } from 'orm';

type User = Pick<
  TgUser,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'isPremium'
  | 'lastName'
  | 'username'
  | 'firstName'
>;

type Message = Pick<TgMessage, 'id' | 'messageId' | 'date' | 'text'> & {
  from?: User;
};

type Update = Pick<TgUpdate, 'id' | 'updateId'> & {
  message?: Message | undefined;
};

export type AllUpdatesOutput = {
  updates: Update[];
};
