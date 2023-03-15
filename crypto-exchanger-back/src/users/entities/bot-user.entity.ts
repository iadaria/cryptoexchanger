import { Column } from 'typeorm';
import { Field } from '@nestjs/graphql';

import { CoreEntity } from 'src/common/entities/core.entity';
import { IsBoolean, IsString } from 'class-validator';

export class BotUser extends CoreEntity {
  //id - Unique identifier for this user or bot.

  @Column({ comment: 'True, if this user is a bot', default: false })
  @Field((type) => Boolean, { defaultValue: false})
  @IsBoolean()
  is_bot: boolean;

  @Column({ comment: "User's or bot's first name" })
  @Field((type) => String)
  @IsString()
  first_name: string;

  @Column({ comment: "Optional. User's or bot's last name", nullable: true })
  @Field((type) => String, { nullable: true })
  @IsString()
  last_name?: string;

  @Column({ comment: "Optional. Use's or bot's username", nullable: true })
  @Field((type) => String, { nullable: true })
  @IsString()
  username?: string;

  // https://en.wikipedia.org/wiki/IETF_language_tag
  @Column({ comment: "Optional. IETF language tag of the user's language", nullable: true })
  @Field((type) => String, { nullable: true })
  @IsString()
  language_code?: string;

  @Column({
    comment: 'Optional. True, if this user is a Telegram Premium user',
    default: false,
  })
  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
  is_premium: boolean;
  
  @Column({
    comment: 'Optional. True, if this user added the bot to the attachment menu',
    default: false,
  })
  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
  added_to_attachment_menu: boolean;

  // https://core.telegram.org/bots/api#getme
  @Column({
    comment: 'Optional. True, if the bot can be invited to groups. Returned only in getMe.',
    default: false,
  })
  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
  can_join_groups: boolean;

  // https://core.telegram.org/bots/features#privacy-mode
  // https://core.telegram.org/bots/api#getme
  @Column({
    comment: 'Optional. True, if privacy mode is disabled for the bot. Returned only in getMe.',
    default: false,
  })
  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
  can_read_all_group_messages: boolean;

  // https://core.telegram.org/bots/api#getme
  @Column({
    comment: 'Optional. True, if the bot supports inline queries. Returned only in getMe.',
    default: false,
  })
  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
  supports_inline_queries: boolean;
}
