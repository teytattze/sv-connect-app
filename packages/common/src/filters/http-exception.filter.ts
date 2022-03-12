import {
  ArgumentsHost,
  Catch,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { IResponseError, ServiceError } from '@sv-connect/domain';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(ex: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const error = this.handleException(ex);
    response.status(error.statusCode).send(error);
  }

  handleException(error: any): IResponseError {
    if (!error) return ServiceError.UNKNOWN;
    if (error instanceof HttpException) {
      return {
        message: error.getResponse()['message'] || ServiceError.UNKNOWN.message,
        errorCode:
          error.getResponse()['errorCode'] || ServiceError.UNKNOWN.errorCode,
        statusCode: error.getStatus() || ServiceError.UNKNOWN.statusCode,
      };
    }
    return { ...ServiceError.UNKNOWN, message: error.message };
  }
}
