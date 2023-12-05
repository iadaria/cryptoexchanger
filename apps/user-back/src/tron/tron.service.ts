import { Inject, Injectable } from '@nestjs/common';
import { TRON_OPTIONS } from 'src/common/common.constants';
import { TronModuleOptions } from './tron.interface';

//const TronWeb = require('tronweb');
import * as TronWeb from 'tronweb';

@Injectable()
export class TronService {
  private readonly tronWeb;
  private contract: TronWeb.Contract
  private readonly fee = {
    feeLimit: 10 ** 7,
    callValue: 0,
  };
  constructor(@Inject(TRON_OPTIONS) private readonly options: TronModuleOptions) {
    console.log({ network: this.options.network });
    this.tronWeb = new TronWeb({
      fullHost: this.options.network,
    });
    this.tronWeb.setPrivateKey(this.options.privateKey);
    console.log({ address: this.tronWeb.defaultAddress });
  }

  async initialize() {
    this.contract = 
  }

  get isPrivateKey(): boolean {
    console.log({ privateKey: this.options.privateKey });
    return Boolean(this.options.privateKey);
  }

  get defaultAddress(): string {
    return this.tronWeb.defaultAddress['base58'];
  }

}
