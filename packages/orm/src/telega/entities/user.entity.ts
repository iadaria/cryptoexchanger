import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsString } from "class-validator";
import { Message } from "./message.entity";

@InputType("UserInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class User {
  @PrimaryColumn({
    comment: "id - Unique identifier for this user or bot",
    type: "bigint",
  })
  @Field((type) => Number)
  id: number;

  @Column({ comment: "is_bot: True, if this user is a bot", default: false })
  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
  isBot: boolean;

  @Column({ comment: "first_name: User's or bot's first name" })
  @Field((type) => String)
  @IsString()
  firstName: string;

  @Column({
    comment: "last_name: Optional. User's or bot's last name",
    nullable: true,
  })
  @Field((type) => String, { nullable: true })
  @IsString()
  lastName?: string;

  @Column({ comment: "Optional. Use's or bot's username", nullable: true })
  @Field((type) => String, { nullable: true })
  @IsString()
  username?: string;

  // https://en.wikipedia.org/wiki/IETF_language_tag
  @Column({
    comment:
      "language_code: Optional. IETF language tag of the user's language",
    nullable: true,
  })
  @Field((type) => String, { nullable: true })
  @IsString()
  languageCode?: string;

  @Column({
    comment: "Optional. True, if this user is a Telegram Premium user",
    default: false,
  })
  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
  isPremium: boolean;

  @Column({
    comment:
      "Optional. True, if this user added the bot to the attachment menu",
    default: false,
  })
  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
  addedToAttachment_menu: boolean;

  // https://core.telegram.org/bots/api#getme
  @Column({
    comment:
      "Optional. True, if the bot can be invited to groups. Returned only in getMe.",
    default: false,
  })
  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
  canJoinGroups: boolean;

  // https://core.telegram.org/bots/features#privacy-mode
  // https://core.telegram.org/bots/api#getme
  @Column({
    comment:
      "Optional. True, if privacy mode is disabled for the bot. Returned only in getMe.",
    default: false,
  })
  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
  canReadAllGroupMessages: boolean;

  // https://core.telegram.org/bots/api#getme
  @Column({
    comment:
      "Optional. True, if the bot supports inline queries. Returned only in getMe.",
    default: false,
  })
  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
  supportsInlineQueries: boolean;

  @Field((type) => [Message])
  @OneToMany((type) => Message, (message) => message.from)
  messages: Message[];

  @CreateDateColumn()
  @Field((type) => Date)
  createdAt: Date;

  @UpdateDateColumn({ precision: 7 })
  @Field((type) => Date)
  updatedAt: Date;
}
