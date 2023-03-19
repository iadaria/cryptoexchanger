import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { TelegrafExecutionContext } from "nestjs-telegraf";
import { Observable } from "rxjs";
import { Context } from "../interfaces/context.interface";

@Injectable()
export class StoreUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const ctx = TelegrafExecutionContext.create(context);
    const { from } = ctx.getContext<Context>();
    
    console.log('** interceptor **')
    console.log({ from });
    
    return next.handle();
  }
}