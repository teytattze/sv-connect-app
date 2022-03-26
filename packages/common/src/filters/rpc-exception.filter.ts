import {
  Catch,
  RpcExceptionFilter as NestRpcExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CoreApiResponse, GeneralCode, ICode } from '@sv-connect/domain';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class RpcExceptionFilter
  implements NestRpcExceptionFilter<RpcException>
{
  catch(ex: RpcException): Observable<any> {
    return throwError(() => this.handleException(ex));
  }

  private handleException(ex: RpcException): CoreApiResponse<null> {
    const error = ex.getError() as ICode;

    const resultStatusCode =
      error?.statusCode || GeneralCode.INTERNAL_SERVER_ERROR.statusCode;
    const resultMessage =
      error?.message || GeneralCode.INTERNAL_SERVER_ERROR.message;
    const resultErrorCode =
      error?.errorCode || GeneralCode.INTERNAL_SERVER_ERROR.errorCode;
    const resultData = null;

    return CoreApiResponse.error(
      resultStatusCode,
      resultMessage,
      resultErrorCode,
      resultData,
    );
  }
}
