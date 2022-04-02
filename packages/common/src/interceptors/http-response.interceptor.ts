import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { CoreHttpResponse, GeneralCode } from '@sv-connect/domain';
import { map, Observable } from 'rxjs';

export class HttpResponseInterceptor implements NestInterceptor {
  intercept(
    _: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map<CoreHttpResponse<any>, CoreHttpResponse<any>>((res) => {
        const resultStatusCode =
          res?.statusCode || GeneralCode.SUCCESS.statusCode;
        const resultErrorCode = res?.errorCode || GeneralCode.SUCCESS.errorCode;
        const resultMessage = res?.message || GeneralCode.SUCCESS.message;
        const resultData = res?.data || null;

        return CoreHttpResponse.success({
          statusCode: resultStatusCode,
          errorCode: resultErrorCode,
          message: resultMessage,
          data: resultData,
        });
      }),
    );
  }
}
