import { CreateAccountRequest } from 'contracts';

export interface CreateAccount
  extends Pick<CreateAccountRequest, 'email' | 'password'> {
  ip?: string;
}
