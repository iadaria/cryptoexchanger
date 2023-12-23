import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { CoreEntity } from "../../entities/common/core.entity";
import { Message } from "./message.entity";
import { GraphQLBigInt } from "graphql-scalars";

@InputType("UpdateInputType", { isAbstract: true })
@ObjectType()
@Entity("Update")
export class Update extends CoreEntity {
  @Column({ nullable: false, type: "bigint" })
  @Field((type) => GraphQLBigInt)
  updateId: bigint;

  @OneToOne((type) => Message, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "messageId", referencedColumnName: "messageId" })
  message?: Message;

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  serialized?: string;
}
