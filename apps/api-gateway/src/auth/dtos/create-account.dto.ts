import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from 'orm';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'role',
]) {}

@ObjectType()
export class CreateAccountOutput /* extends CoreOutput */ {}
