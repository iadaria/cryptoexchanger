import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    console.log('***');
    console.log(exception.getError());
    console.log(exception.message);
    console.log(exception, { host });
    return null;
    //return throwError(() => exception.getError());
  }
}
