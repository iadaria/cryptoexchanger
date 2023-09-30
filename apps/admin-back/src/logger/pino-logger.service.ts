import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { pino } from 'pino';
import { ASYNC_STORAGE } from './logger.constants';

const logger = pino({ transport: { target: 'pino-pretty' } });

@Injectable()
export class PinoLogger implements LoggerService {
  constructor(
    @Inject(ASYNC_STORAGE)
    private readonly als: AsyncLocalStorage<Map<string, string>>,
  ) {}
  private getMessage(message: any, context?: string) {
    return context ? `[ ${context} ] ${message}` : message;
  }
  log(message: any, context?: string) {
    const traceId = this.als.getStore()?.get('traceId');
    logger.info({ traceId }, this.getMessage(message, context));
  }
  error(message: any, context?: string, trace?: string) {
    const traceId = this.als.getStore()?.get('traceId');
    logger.error({ traceId }, this.getMessage(message, context));
    if (trace) {
      logger.error(trace);
    }
  }
  warn(message: any, context?: string) {
    const traceId = this.als.getStore()?.get('traceId');
    logger.warn({ traceId }, this.getMessage(message, context));
  }
  debug?(message: any, ...optionalParams: any[]) {}
  verbose?(message: any, ...optionalParams: any[]) {}
}
