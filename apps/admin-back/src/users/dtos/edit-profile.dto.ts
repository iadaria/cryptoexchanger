import { User } from 'orm';

export type EditProfileInput = Pick<User, 'email' | 'password'>;
