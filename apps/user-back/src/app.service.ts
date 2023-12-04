import { Inject, Injectable } from '@nestjs/common';
import { TRON_OPTIONS } from './common/common.constants';
import { TronModuleOptions } from './tron/tron.interface';

@Injectable()
export class AppService {
  constructor(
    @Inject(TRON_OPTIONS) private readonly options: TronModuleOptions,
  ) {}
  getHello(): string {
    console.log(this.options.privateKey);
    return 'Hello World!';
  }
}
