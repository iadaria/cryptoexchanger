import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { Column, Entity } from "typeorm";
import { CoreEntity } from "../common/core.entity";

@InputType("AuthSession", { isAbstract: true })
@ObjectType()
@Entity()
export class Session extends CoreEntity {
  @Column()
  @Field((type) => String, { nullable: false })
  @IsString()
  userAgent: string;

  @Column({ unique: true })
  @Field((type) => String, { nullable: false })
  @IsString()
  token: string;

  @Column({ unique: true })
  @Field((type) => String, { nullable: false })
  @IsString()
  user: string;
}
