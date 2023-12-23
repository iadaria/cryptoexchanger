import {
  Field,
  InputType,
  ObjectType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  Bank,
  Coin,
  ExchangeStatus,
  ExchangeType,
  Fiat,
  Network,
} from 'common';
import { ExchangeOrder } from 'orm';

/* const loggerMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value = await next();
  console.log(value);
  return getExchangeStatus(value);
}; */

/* registerEnumType(ExchangeType, { name: 'ExchangeType' });
registerEnumType(ExchangeStatus, { name: 'ExchangeStatus' });
registerEnumType(Coin, { name: 'Coin' });
registerEnumType(Network, { name: 'Network' });
registerEnumType(Fiat, { name: 'Fiat' });
registerEnumType(Bank, { name: 'Bank' });
 */
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
export class CreateOrderOutput extends PickType(
  ExchangeOrder,
  ['id', 'createdAt', 'expireAt', 'toAddress', 'amount', 'status'],
  ObjectType,
) {}
