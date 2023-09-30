import { Catch, HttpException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

@Catch()
export class GqlErrorFilter implements GqlExceptionFilter {
  catch(exception, host: GqlArgumentsHost) {
    console.log({ exception });
    //const ctx = host.switchToHttp();
    //const response = ctx.getResponse<Response>();
    //const request = ctx.getRequest<Request>();

    return new HttpException(exception?.details, exception?.code);
  }
}

/*const status = exception.getStatus
  ? exception.getStatus()
  : HttpStatus.INTERNAL_SERVER_ERROR;

if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
  // tslint:disable-next-line: no-console
  console.error(exception);
}

const errorResponse = {
  statusCode: status,
  timestamp: new Date().toLocaleDateString(),
  error:
    status !== HttpStatus.INTERNAL_SERVER_ERROR
      ? exception.message.error || exception.message || null
      : "Internal server error",
};

// This is for REST petitions
if (request) {
  const error = {
    ...errorResponse,
    path: request.url,
    method: request.method,
  };

  Logger.error(
    `${request.method} ${request.url}`,
    JSON.stringify(error),
    "ExceptionFilter",
  );

  response.status(status).json(errorResponse);
} else {
  // This is for GRAPHQL petitions
  const error = {
    ...errorResponse,
    type: info.parentType,
    field: info.fieldName,
  };

  Logger.error(
    `${info.parentType} ${info.fieldName}`,
    JSON.stringify(error),
    "ExceptionFilter",
  );

  return exception;
} */
