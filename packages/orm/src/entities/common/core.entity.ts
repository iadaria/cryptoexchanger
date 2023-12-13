import { Field, ObjectType } from "@nestjs/graphql";
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
export class CoreEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  @Field((type) => BigInt)
  id: bigint;

  @CreateDateColumn()
  @Field((type) => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field((type) => Date)
  updatedAt: Date;
}
