import {
  Catch,
  RpcExceptionFilter as NestRpcExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CoreServiceResponse, GeneralCode, ICode } from '@sv-connect/domain';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class RpcExceptionFilter
  implements NestRpcExceptionFilter<RpcException>
{
  catch(ex: RpcException): Observable<CoreServiceResponse<null>> {
    return throwError(() => this.handleException(ex));
  }

  private handleException(ex: RpcException): CoreServiceResponse<null> {
    const error = ex.getError() as ICode;

    const resultStatusCode =
      error?.statusCode || GeneralCode.INTERNAL_SERVER_ERROR.statusCode;
    const resultMessage =
      error?.message || GeneralCode.INTERNAL_SERVER_ERROR.message;
    const resultErrorCode =
      error?.errorCode || GeneralCode.INTERNAL_SERVER_ERROR.errorCode;
    const resultData = null;

    return CoreServiceResponse.error({
      statusCode: resultStatusCode,
      errorCode: resultErrorCode,
      message: resultMessage,
      data: resultData,
    });
  }
}
