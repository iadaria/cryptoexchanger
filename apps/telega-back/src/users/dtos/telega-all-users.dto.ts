import { Field, ObjectType } from '@nestjs/graphql';
//import { BotUser } from "src/bot/users/entities/bot-user.entity";

@ObjectType()
export class TelegaAllUsersOutput {
  //@Field(type => [BotUser], { nullable: true })
  //users?: BotUser[];
}
