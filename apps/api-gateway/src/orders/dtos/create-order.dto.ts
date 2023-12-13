import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { ExchangeOrder } from 'orm';
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { getExchangeStatus } from 'common';

const loggerMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value = await next();
  console.log(value);
  return getExchangeStatus(value);
};

@InputType()
export class CreateOrderInput extends PickType(ExchangeOrder, [
  'amount',
  'bank',
  'cardNumber',
  'coin',
  'email',
  'fee',
  'fiat',
  'isAgree',
  'net',
  'rate',
  'type',
]) {}

@ObjectType()
export class CreateOrderOutput extends PickType(ExchangeOrder, [
  'id',
  'createdAt',
  'expireAt',
  'toAddress',
  'amount',
  'status',
]) {
  // @Field((type) => ExchangeStatus)
  // //@Field({ middleware: [loggerMiddleware] })
  // status: ExchangeStatus;
}
