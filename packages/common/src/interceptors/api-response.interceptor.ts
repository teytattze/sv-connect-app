import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { CoreApiResponse, GeneralCode } from '@sv-connect/domain';
import { map, Observable } from 'rxjs';

export class ApiResponseInterceptor implements NestInterceptor {
  intercept(
    _: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map<CoreApiResponse<any>, CoreApiResponse<any>>((res) => {
        const resultData = res?.data || null;
        const resultMessage = res?.message || GeneralCode.SUCCESS.message;
        return CoreApiResponse.success(resultData, resultMessage);
      }),
    );
  }
}
