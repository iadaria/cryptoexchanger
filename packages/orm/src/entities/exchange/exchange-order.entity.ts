import { Column, Entity } from "typeorm";
import { CoreEntity } from "../common/core.entity";
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";
import { IsEmail } from "class-validator";
import {
  Bank,
  Coin,
  Fiat,
  Network,
  ExchangeStatus,
  ExchangeType,
} from "common";
import { GraphQLBigInt } from "graphql-scalars";

registerEnumType(ExchangeType, { name: "ExchangeType" });
registerEnumType(ExchangeStatus, { name: "ExchangeStatus" });
registerEnumType(Coin, { name: "Coin" });
registerEnumType(Network, { name: "Network" });
registerEnumType(Fiat, { name: "Fiat" });
registerEnumType(Bank, { name: "Bank" });

@InputType("ExchangeOrder", { isAbstract: true })
@ObjectType("ExchangeOrder")
@Entity("ExchangeOrder")
export class ExchangeOrder extends CoreEntity {
  @Field((type) => String)
  @Column({ unique: false })
  @IsEmail()
  email: string;

  @Field((type) => String)
  @Column()
  ip: string;

  @Field((type) => ExchangeType)
  @Column({ type: "enum", enum: ExchangeType })
  type: ExchangeType;

  @Field((type) => ExchangeStatus)
  @Column({
    type: "enum",
    enum: ExchangeStatus,
    default: ExchangeStatus.Active,
  })
  status: ExchangeStatus;

  @Field((type) => Coin)
  @Column({ type: "enum", enum: Coin })
  coin: Coin;

  @Field((type) => Network)
  @Column({ type: "enum", enum: Network })
  net: Network;

  @Field((type) => Fiat)
  @Column({ type: "enum", enum: Fiat })
  fiat: Fiat;

  @Field((type) => GraphQLBigInt)
  @Column({ type: "bigint" })
  amount: bigint;

  @Field((type) => GraphQLBigInt)
  @Column({ type: "bigint" })
  rate: bigint;

  @Field((type) => GraphQLBigInt)
  @Column({ type: "bigint" })
  fee: bigint;

  @Field((type) => Bank)
  @Column({ type: "enum", enum: Bank })
  bank: Bank;

  @Field((type) => Number)
  @Column()
  cardNumber: number;

  @Field((type) => Date)
  @Column()
  expireAt: Date;

  @Field((type) => Date)
  @Column()
  approvedAt?: Date;

  @Field((type) => Date)
  @Column()
  updatedStatusAt?: Date;

  @Field((type) => GraphQLBigInt)
  @Column({ type: "bigint" })
  targetOrderId?: bigint;

  @Field((type) => ExchangeStatus)
  @Column({
    type: "enum",
    enum: ExchangeStatus,
  })
  prevStatus?: ExchangeStatus;

  @Field((type) => Boolean)
  @Column({ default: false })
  isAgree?: boolean;

  @Field((type) => String)
  @Column()
  toAddress: string;

  @Field((type) => Object, { nullable: true })
  @Column({ type: "json", nullable: true })
  meta?: object;

  // accountId
}
