import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { CoreEntity } from "../../entities/common/core.entity";
import { TgUser } from "./user.entity";

@InputType("MessageInputType", { isAbstract: true })
@ObjectType()
@Entity("Message")
export class Message extends CoreEntity {
  @Column({
    comment: "Integer. Unique message identifier inside this chat",
    nullable: false,
    type: "bigint",
    unique: true,
  })
  @Field((type) => Number)
  messageId: number;

  @Column({
    comment:
      "Integer. Optional. Unique identifier of a message thread to which the message belongs; for supergroups only",
    nullable: true,
    type: "bigint",
  })
  @Field((type) => Number, { nullable: true })
  messageThreadId?: number;

  @Field((type) => TgUser, { nullable: false })
  @ManyToOne((type) => TgUser, (user) => user.messages, { eager: true })
  from?: TgUser;

  //chat: Chat

  @Column({
    transformer: {
      to(value) {
        return new Date(value * 1000).toISOString();
      },
      from(value) {
        return value;
      },
    },
  })
  @Field((type) => Date)
  date: Date;

  @Column()
  @Field((type) => String)
  text: string;

  //entities: [];

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  serialized?: string;
}
