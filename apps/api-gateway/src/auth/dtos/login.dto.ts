import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from 'orm';

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput /* extends CoreOutput */ {
  @Field((type) => String, { nullable: true })
  token?: string;
}
