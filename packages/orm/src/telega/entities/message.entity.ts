import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { CoreEntity } from "../../entities/common/core.entity";
import { User } from "./user.entity";

@InputType("MessageInputType", { isAbstract: true })
@ObjectType()
@Entity()
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

  @Field((type) => User, { nullable: false })
  @ManyToOne((type) => User, (user) => user.messages)
  from?: User;

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
