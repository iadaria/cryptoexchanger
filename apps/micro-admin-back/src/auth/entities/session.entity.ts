import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity } from "typeorm";

@InputType('AuthSession', { isAbstract: true})
@ObjectType()
@Entity()
export class Session extends CoreEntity {

  @Column()
  @Field((type) => String, { nullable: false})
  @IsString()
  userAgent: string;
  
  @Column({ unique: true })
  @Field((type) => String, { nullable: false})
  @IsString()
  token: string;
  
  @Column({ unique: true})
  @Field((type) => String, { nullable: false})
  @IsString()
  user: string;
}