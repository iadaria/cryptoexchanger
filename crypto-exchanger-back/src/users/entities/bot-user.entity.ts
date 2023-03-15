import { Column, Entity } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreEntity } from 'src/common/entities/core.entity';
import { IsBoolean, IsString } from 'class-validator';

export enum BotUserField {
  is_bot = 'isBot',
  first_name = 'firstName',
  last_name = "lastName",
  language_code = "languageCode",
  is_premium = "isPremium",
  added_to_attachment_menu = "addedToAttachmentMenu",
  can_join_groups = "canJoinGroups",
  can_read_all_group_messages = "canReadAllGroupMessages",
  supports_inline_queries = "supportsInlineQueries"
}

@InputType('BotUser', { isAbstract: true })
@ObjectType()
@Entity({ name: 'BotUser'})
export class BotUser extends CoreEntity {
  //id - Unique identifier for this user or bot.

  @Column({ name: 'isBot', comment: 'is_bot: True, if this user is a bot', default: false })
  @Field((type) => Boolean, { name: 'isBot', defaultValue: false})
  @IsBoolean()
  [BotUserField.is_bot]: boolean;

  @Column({ name: 'firstName', comment: "first_name: User's or bot's first name" })
  @Field((type) => String, { name: 'firstName'})
  @IsString()
  [BotUserField.first_name]: string;

  @Column({ name: 'lastName', comment: "last_name: Optional. User's or bot's last name", nullable: true })
  @Field((type) => String, { name: 'lastName', nullable: true })
  @IsString()
  [BotUserField.last_name]?: string;

  @Column({ comment: "Optional. Use's or bot's username", nullable: true })
  @Field((type) => String, { nullable: true })
  @IsString()
  username?: string;

  // https://en.wikipedia.org/wiki/IETF_language_tag
  @Column({ name: 'languageCode', comment: "language_code: Optional. IETF language tag of the user's language", nullable: true })
  @Field((type) => String, { name: 'languageCode', nullable: true })
  @IsString()
  [BotUserField.language_code]?: string;

  @Column({
    name: 'isPremium',
    comment: 'Optional. True, if this user is a Telegram Premium user',
    default: false,
  })
  @Field((type) => Boolean, { name: 'isPremium', defaultValue: false })
  @IsBoolean()
  [BotUserField.is_premium]: boolean;
  
  @Column({
    comment: 'Optional. True, if this user added the bot to the attachment menu',
    default: false,
  })
  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
  [BotUserField.added_to_attachment_menu]: boolean;

  // https://core.telegram.org/bots/api#getme
  @Column({
    comment: 'Optional. True, if the bot can be invited to groups. Returned only in getMe.',
    default: false,
  })
  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
  [BotUserField.can_join_groups]: boolean;

  // https://core.telegram.org/bots/features#privacy-mode
  // https://core.telegram.org/bots/api#getme
  @Column({
    comment: 'Optional. True, if privacy mode is disabled for the bot. Returned only in getMe.',
    default: false,
  })
  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
 [BotUserField.can_read_all_group_messages]: boolean;

  // https://core.telegram.org/bots/api#getme
  @Column({
    comment: 'Optional. True, if the bot supports inline queries. Returned only in getMe.',
    default: false,
  })
  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
  [BotUserField.supports_inline_queries]: boolean;
}
