import {
  Catch,
  RpcExceptionFilter as NestRpcExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { IResponseError, ServiceError } from '@sv-connect/domain';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class RpcExceptionFilter
  implements NestRpcExceptionFilter<RpcException>
{
  catch(ex: RpcException): Observable<any> {
    console.log(ex.getError());
    return throwError(() => this.handleException(ex));
  }

  private handleException(ex: RpcException): IResponseError {
    const error = ex.getError() as any;
    if (!error) return ServiceError.UNKNOWN;

    if (error instanceof Object) {
      return {
        message: error.message || ServiceError.UNKNOWN.message,
        errorCode: error.errorCode || ServiceError.UNKNOWN.errorCode,
        statusCode: error.statusCode || ServiceError.UNKNOWN.statusCode,
      };
    }

    return { ...ServiceError.UNKNOWN, message: error.message };
  }
}
