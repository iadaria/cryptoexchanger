import { Module } from '@nestjs/common';
import { TronService } from './tron.service';
import { TronProvider } from './tron.provider';

@Module({
  providers: [TronProvider, TronService],
})
export class TronModule {}
/* @Global()
export class TronModule {
  static async forRootAsync(
    options: TronModuleOptions,
  ): Promise<DynamicModule> {
    return {
      module: TronModule,
      providers: [TronProvider, TronService],
    };
  }
}
 */
