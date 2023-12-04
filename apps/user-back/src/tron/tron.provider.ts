import { ConfigService } from '@nestjs/config';
import { TRON_OPTIONS } from 'src/common/common.constants';
import { TronModuleOptions } from './tron.interface';
import { Provider } from '@nestjs/common';

export const TronProvider: Provider = {
  //imports: [ConfigModule],
  provide: TRON_OPTIONS,
  useFactory: (configService: ConfigService): TronModuleOptions => ({
    network: configService.get('TRON_SHASTA_NETWORK'),
    contract: configService.get('TRON_SHASTA_CONTRACT'),
    toAddress: configService.get('TRON_ADDRESS_2'),
    privateKey: configService.get('TRON_PRIVATE_KEY'),
  }),
  inject: [ConfigService],
};
