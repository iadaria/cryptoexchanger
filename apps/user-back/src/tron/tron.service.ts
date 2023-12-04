import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS, TRON_OPTIONS } from 'src/common/common.constants';
import { TronModuleOptions } from './tron.interface';

@Injectable()
export class TronService {
  constructor(
    @Inject(TRON_OPTIONS) private readonly options: TronModuleOptions,
  ) {}

  get isPrivateKey(): boolean {
    console.log({ privateKey: this.options.privateKey });
    return Boolean(this.options.privateKey);
  }
}
