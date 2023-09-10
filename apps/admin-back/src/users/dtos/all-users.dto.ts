import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from '../entities/user.entity';

@ObjectType()
export class AllUsersOutput extends CoreOutput {
  @Field((type) => [User], { nullable: true })
  users: User[];
}
