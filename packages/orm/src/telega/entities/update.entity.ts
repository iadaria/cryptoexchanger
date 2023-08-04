import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { CoreEntity } from "../../entities/common/core.entity";
import { Message } from "./message.entity";

@InputType("UpdateInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class Update extends CoreEntity {
  @Column({ type: "bigint", nullable: false })
  @Field((type) => BigInt)
  update_id: bigint;

  @OneToOne((type) => Message, { onDelete: "CASCADE", nullable: true })
  @JoinColumn()
  message?: Message;

  @Column()
  @Field((type) => String)
  serialized: string;
}
