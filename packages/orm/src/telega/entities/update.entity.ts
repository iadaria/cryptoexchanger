import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { CoreEntity } from "../../entities/common/core.entity";
import { Message } from "./message.entity";

@InputType("UpdateInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class Update extends CoreEntity {
  @Column({ nullable: false, type: "bigint" })
  @Field((type) => Number)
  update_id: number;

  @OneToOne((type) => Message, { onDelete: "CASCADE", nullable: true })
  @JoinColumn()
  message?: Message;

  @Column()
  @Field((type) => String)
  serialized: string;
}
