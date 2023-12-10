export interface TronModuleOptions {
  network: string;
  eventApi?: string;
  contract: string;
  privateKey: string;
  toAddress: string;
  minTrx?: BigInt;
  defaultAddress?: string;
}
