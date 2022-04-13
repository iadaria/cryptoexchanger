import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { async } from 'rxjs';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';
import { ITelegramModuleAsyncOptions } from './telegram.interface';
import { TelegramService } from './telegram.service';

@Global() // Чтобы не инджектить в других модулях
@Module({})
export class TelegramModule {
  // чтобы не создавть instance класса
  static forRootAsync(options: ITelegramModuleAsyncOptions): DynamicModule {
    // Создаем его в качестве провайдера, чтобы потом в любом месте достать его по токену(TELEGRAM_MODULE_OPTIONS)
    const asyncOptions = this.createAsyncOptionsProvider(options);
    return {
      module: TelegramModule,
      imports: options.imports,
      providers: [TelegramService, asyncOptions],
      exports: [TelegramService],
    }
  }

  private static createAsyncOptionsProvider(options: ITelegramModuleAsyncOptions): Provider {
    return {
      provide: TELEGRAM_MODULE_OPTIONS,
      useFactory: async(...args: any[]) => {
        const config = await options.useFactory(...args);
        return config;
      },
      inject: options.inject || []
    }
  }
}
