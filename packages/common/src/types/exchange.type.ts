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

export const isExchangeStatus = (value: string) =>
  allStatus.includes(value as ExchangeStatus);

export const getExchangeStatus = (value: string) =>
  allStatus.find((status) => allVariants(value).includes(status));
