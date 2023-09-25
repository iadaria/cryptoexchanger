import { Field, ObjectType } from '@nestjs/graphql';
//import { BotUser } from "src/bot/users/entities/bot-user.entity";
import { CoreOutput } from 'src/common/dto/output.dto';

@ObjectType()
export class TelegaAllUsersOutput /* extends CoreOutput */ {
  //@Field(type => [BotUser], { nullable: true })
  //users?: BotUser[];
}
