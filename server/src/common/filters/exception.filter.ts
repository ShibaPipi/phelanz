import { Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Response } from 'express';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
  private logger = new Logger('ExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let code = 500;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      this.logger.error('HttpException: => ', exception);
      code = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : 'message' in exceptionResponse
            ? (exceptionResponse.message as string)
            : 'Whoops, something went wrong...';
    } else if (exception instanceof PrismaClientKnownRequestError) {
      console.log(exception);
    } else {
      this.logger.error('Global error handler:', exception);
    }

    response.status(code).json({
      code,
      message,
      data: null,
    });
  }
}
