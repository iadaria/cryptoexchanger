import { User } from 'orm';

export type CreateAccountInput = Pick<User, 'email' | 'password'> & {
  ip?: string;
};
