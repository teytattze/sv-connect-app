import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { CoreServiceResponse, GeneralCode } from '@sv-connect/domain';
import { map, Observable } from 'rxjs';

export class ServiceResponseInterceptor implements NestInterceptor {
  intercept(
    _: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map<CoreServiceResponse<any>, CoreServiceResponse<any>>((res) => {
        const resultStatusCode =
          res?.statusCode || GeneralCode.SUCCESS.statusCode;
        const resultErrorCode = res?.errorCode || GeneralCode.SUCCESS.errorCode;
        const resultMessage = res?.message || GeneralCode.SUCCESS.message;
        const resultData = res?.data || null;

        return CoreServiceResponse.success({
          statusCode: resultStatusCode,
          errorCode: resultErrorCode,
          message: resultMessage,
          data: resultData,
        });
      }),
    );
  }
}
