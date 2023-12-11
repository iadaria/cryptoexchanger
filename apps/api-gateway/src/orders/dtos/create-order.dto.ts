import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { ExchangeOrder } from 'orm';

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
]) {}

@ObjectType()
export class CreateOrderOutput {}
