import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { UserProfile } from './user-profile.dto';

@ObjectType()
export class AllUsersOutput extends CoreOutput {
  @Field((type) => [UserProfile], { nullable: true })
  users?: UserProfile[];
}
