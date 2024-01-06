import { allVariants } from "../utils/types";

export enum ExchangeType {
  sell = "sell",
  buy = "buy",
}

export enum ExchangeStatus {
  Done = "done",
  Active = "active",
  Rejected = "rejected",
  Timeout = "timeout",
  Cancelled = "cancelled",
}

const allStatus = Object.values(ExchangeStatus);
const types = Object.values(ExchangeType);


export const isExchangeStatus = (value: string) =>
  allStatus.includes(value as ExchangeStatus);

export const getExchangeStatus = (value: string) =>
  allStatus.find((status) => allVariants(value).includes(status));

export const getExchangeType = (value: string) =>
  types.find((type) => allVariants(value).includes(type));