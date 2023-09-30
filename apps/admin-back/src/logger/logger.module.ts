import { Module } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { PinoLogger } from './pino-logger.service';
import { ASYNC_STORAGE } from './logger.constants';

@Module({
  providers: [
    {
      provide: ASYNC_STORAGE,
      useValue: new AsyncLocalStorage(),
    },
    PinoLogger,
  ],
  exports: [PinoLogger],
})
export class LoggerModule {}
