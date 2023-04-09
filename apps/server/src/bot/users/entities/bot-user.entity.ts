import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from 'telegraf/typings/core/types/typegram';
import { IsBoolean, IsString } from 'class-validator';

export enum BotUserField {
  is_bot = 'isBot',
  first_name = 'firstName',
  last_name = 'lastName',
  language_code = 'languageCode',
  is_premium = 'isPremium',
  added_to_attachment_menu = 'addedToAttachmentMenu',
  can_join_groups = 'canJoinGroups',
  can_read_all_group_messages = 'canReadAllGroupMessages',
  supports_inline_queries = 'supportsInlineQueries',
}

export const keysOfBotUserField = () => Object.keys(BotUserField);

export const transformUserDto = (form: User) => {};

@InputType('BotUser', { isAbstract: true })
@ObjectType()
@Entity({ name: 'BotUser' })
export class BotUser {

  @PrimaryColumn({ comment: 'id - Unique identifier for this user or bot'})
  @Field((type) => Number)
  id: number;

  @Column({ comment: 'is_bot: True, if this user is a bot', default: false, })
  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
  is_bot: boolean;
  //[BotUserField.is_bot]: boolean;

  @Column({ comment: "first_name: User's or bot's first name" })
  @Field((type) => String)
  @IsString()
  first_name: string;
  //[BotUserField.first_name]: string;

  @Column({ comment: "last_name: Optional. User's or bot's last name", nullable: true })
  @Field((type) => String, { nullable: true })
  @IsString()
  last_name?: string;

  @Column({ comment: "Optional. Use's or bot's username", nullable: true })
  @Field((type) => String, { nullable: true })
  @IsString()
  username?: string;

  // https://en.wikipedia.org/wiki/IETF_language_tag
  @Column({
    comment: "language_code: Optional. IETF language tag of the user's language",
    nullable: true,
  })
  @Field((type) => String, { nullable: true })
  @IsString()
  language_code?: string;
  //[BotUserField.language_code]?: string;

  @Column({
    comment: 'Optional. True, if this user is a Telegram Premium user',
    default: false,
  })
  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
  is_premium: boolean;
  //[BotUserField.is_premium]: boolean;

  @Column({
    comment: 'Optional. True, if this user added the bot to the attachment menu',
    default: false,
  })
  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
  added_to_attachment_menu: boolean;
  //[BotUserField.added_to_attachment_menu]: boolean;

  // https://core.telegram.org/bots/api#getme
  @Column({
    comment: 'Optional. True, if the bot can be invited to groups. Returned only in getMe.',
    default: false,
  })
  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
  can_join_groups: boolean;
  //[BotUserField.can_join_groups]: boolean;

  // https://core.telegram.org/bots/features#privacy-mode
  // https://core.telegram.org/bots/api#getme
  @Column({
    comment: 'Optional. True, if privacy mode is disabled for the bot. Returned only in getMe.',
    default: false,
  })
  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
  can_read_all_group_messages: boolean;
  //[BotUserField.can_read_all_group_messages]: boolean;

  // https://core.telegram.org/bots/api#getme
  @Column({
    comment: 'Optional. True, if the bot supports inline queries. Returned only in getMe.',
    default: false,
  })
  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
  supports_inline_queries: boolean;
  //[BotUserField.supports_inline_queries]: boolean;

  @CreateDateColumn()
  @Field((type) => Date)
  createdAt: Date;

  @UpdateDateColumn({ precision: 7})
  @Field((type) => Date)
  updateAt: Date;
}
