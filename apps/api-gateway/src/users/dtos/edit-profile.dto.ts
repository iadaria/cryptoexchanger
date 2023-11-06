import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { User } from 'orm';

@InputType()
export class EditProfileInput extends PartialType(
  PickType(User, ['email', 'password']),
) {}

@ObjectType()
export class EditProfileOutput /* extends CoreOutput */ {}
