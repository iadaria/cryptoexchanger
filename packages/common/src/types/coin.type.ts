import { allVariants } from "../utils/types";

export enum Coin {
  BTC = "btc",
  ETH = "eth",
  LTC = "ltc",
  USDT = "usdt",
  TON = "ton",
  USDC = "usdc",
  SOL = "sol",
  MATIC = "matic",
}

const allCoins = Object.values(Coin);

export const getCoin = (value: string) =>
  allCoins.find((coin) => allVariants(value).includes(coin));

export const isCoin = (value: string) => allCoins.includes(value as Coin);

export enum Network {
  btc = "btc",
  ltc = "ltc",
  erc20 = "erc20",
  trc20 = "trc20",
  bep20 = "bep20",
  polygon = "polygon",
}
