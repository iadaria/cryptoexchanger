import { Output } from 'src/common/dtos/output.dto';
import { UserProfile } from './user-profile.dto';

export type AllUsersOutput = Output & {
  users: UserProfile[];
};
