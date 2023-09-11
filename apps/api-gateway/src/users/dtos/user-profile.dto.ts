import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from '../entities/user.entity';

@ArgsType()
export class UserProfileInput {
  @Field((type) => Int)
  userId: number;
}

@ObjectType()
export class UserProfile {
  @Field((type) => Number)
  id: number;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field((type) => String)
  email: string;

  @Field((type) => Boolean)
  verified: boolean;
}

@ObjectType()
export class UserProfileOutput extends CoreOutput {
  @Field((type) => UserProfile, { nullable: true })
  user?: UserProfile;
}
