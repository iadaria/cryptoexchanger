import { Inject, Injectable } from '@nestjs/common';
import { TRON_OPTIONS } from 'src/common/common.constants';
import { TronModuleOptions } from './tron.interface';

const TronWeb = require('tronweb');

// https://github.com/tronprotocol/tron-contracts/tree/master
// https://github.com/tronprotocol
// https://developers.tron.network/reference/getconfirmedtransaction

@Injectable()
export class TronService {
  private readonly tronWeb;
  private readonly fee = {
    feeLimit: 10 ** 7,
    callValue: 0,
  };
  private contract;
  constructor(@Inject(TRON_OPTIONS) private readonly options: TronModuleOptions) {
    this.tronWeb = new TronWeb({
      fullHost: options.network,
    });
    this.tronWeb.setPrivateKey(options.privateKey);
    this.initialize();
  }

  async initialize() {
    /*     if (this.options.defaultAddress) {
      this.contract = await this.tronWeb.setAddress(this.options.defaultAddress);
    } */
    this.contract = await this.tronWeb.contract().at(this.options.contract);
  }

  set defaultAddress(address: string) {
    this.tronWeb.setAddress(address);
  }

  get defaultAddress(): string {
    return this.tronWeb.defaultAddress['base58'];
  }

  async getBalance(address: string): Promise<BigInt> {
    await this.initialize();
    return this.contract.balanceOf(address).call();
  }

  async getTrxBalance(address: string): Promise<BigInt> {
    return this.tronWeb.trx.getBalance(address);
  }

  async sufficientBalance(address: string, required: BigInt): Promise<boolean> {
    const balance = await this.getBalance(address);
    const trx = await this.getTrxBalance(address);
    return balance > required && trx > this.options.minTrx;
  }

  public async txConfirmed(hash: string): Promise<boolean> {
    return this.tronWeb.trx.getConfirmedTransaction(hash).then((x) => !!x);
  }

  async sendTransaction(id: number, fromAddr: string, toAddr: string, amount: BigInt): Promise<string> {
    const isSufficient = await this.sufficientBalance(fromAddr, amount);
    if (!isSufficient) {
      // send balance notification to telega
      throw new Error(`Not enough funds in the wallet, trying to send ${amount}`);
    }
    // const refAmount = amount.split('.')[0];
    const result = await this.contract.transfer(toAddr, amount).send({
      feeLimit: 10 * 6,
      callVallue: 0,
    });

    return result;
  }
}
