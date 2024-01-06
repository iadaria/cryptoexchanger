import { allVariants } from "../utils/types";

export enum Fiat {
  RUB = "rub",
  USD = "usd",
  KZT = "kzt",
  TRY = "try",
  BYN = "byn",
}

const fiats = Object.values(Fiat);

export const getFiat = (value: string) => 
  fiats.find(fiat => allVariants(value).includes(fiat));

export enum Bank {
  Tinkoff = "Tinkoff",
  Sber = "Sberbank",
  QIWI = "Qiwi",
}

const banks = Object.values(Bank);

export const getBank = (value: string) =>
  banks.find(bank => allVariants(value).includes(bank));