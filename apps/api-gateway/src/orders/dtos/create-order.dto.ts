import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { ExchangeOrder } from 'orm';
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { ExchangeStatus, getExchangeStatus } from 'common';

const loggerMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value = await next();
  console.log(value);
  return getExchangeStatus(value);
};

// Resolve field https://dev.to/tugascript/how-to-solve-the-graphql-n1-problem-in-nestjs-with-dataloaders-and-mikroorm-for-both-apollo-and-mercurius-3klk

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
