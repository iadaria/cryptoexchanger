import { User } from 'orm';

// https://www.typescriptlang.org/docs/handbook/utility-types.html
export type CreateUserInput = Pick<
  User,
  'email' | 'verified' | 'authWay' | 'password'
>;
