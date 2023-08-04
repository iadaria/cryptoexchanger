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
  })
  @Field((type) => BigInt)
  message_id: bigint;

  @Column({
    comment:
      "Integer. Optional. Unique identifier of a message thread to which the message belongs; for supergroups only",
    nullable: false,
    type: "bigint",
  })
  @Field((type) => BigInt)
  message_thread_id: bigint;

  @Field((type) => User, { nullable: false })
  @ManyToOne((type) => User, (user) => user.messages)
  from?: User;

  //chat: Chat

  @Column()
  @Field((type) => Date)
  date: Date;

  @Column()
  @Field((type) => String)
  text: string;

  //entities: [];

  @Column()
  @Field((type) => String)
  serialized: string;
}
