import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
/* import { Update as UpdateOrm, Message, TgUser } from 'orm';

@ObjectType({ isAbstract: true })
export class TgUserOutput extends PickType(
  TgUser,
  [
    'id',
    'createdAt',
    'updatedAt',
    'isPremium',
    'lastName',
    'firstName',
    'username',
  ],
  ObjectType,
) {}

@ObjectType()
export class MessageOutput extends PickType(
  Message,
  ['id', 'messageId', 'date', 'text'],
  ObjectType,
) {
  @Field((type) => TgUserOutput, { nullable: true })
  from?: TgUserOutput;
}

@ObjectType()
export class UpdateOutput extends OmitType(
  UpdateOrm,
  ['message', 'createdAt', 'updatedAt', 'serialized'],
  ObjectType,
) {
  @Field((type) => MessageOutput)
  message?: MessageOutput;
}

@ObjectType({ isAbstract: true })
export class GetUpdatesOutput {
  @Field((type) => [UpdateOutput], { nullable: true })
  updates?: UpdateOutput[];
}
 */
