import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import { CoreEntity } from "../../entities/common/core.entity";
import { IsString } from "class-validator";

@InputType("ChatInputType", { isAbstract: true })
@ObjectType()
@Entity("Chat")
export class Chat extends CoreEntity {
  @Field((type) => Number)
  updateId: bigint;

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

  @Column({
    comment:
      "Type of chat, can be either “private”, “group”, “supergroup” or “channel”",
    nullable: false,
  })
  @Field((type) => String)
  @IsString()
  type: string;
}
