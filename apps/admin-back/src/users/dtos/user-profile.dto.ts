import { User } from 'orm';

export type UserProfile = Pick<
  User,
  'email' | 'id' | 'updatedAt' | 'createdAt' | 'verified'
>;
