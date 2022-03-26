import {
  ArgumentsHost,
  Catch,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import {
  CoreApiException,
  CoreApiResponse,
  GeneralCode,
} from '@sv-connect/domain';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(ex: CoreApiException | HttpException | Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const apiResponseError = this.handleException(ex);
    response.status(apiResponseError.statusCode).send(apiResponseError);
  }

  private handleException(
    ex: HttpException | CoreApiException | Error,
  ): CoreApiResponse {
    if (ex instanceof HttpException) {
      const resultStatusCode =
        ex.getStatus() || GeneralCode.INTERNAL_SERVER_ERROR.statusCode;
      const resultMessage =
        ex.message || GeneralCode.INTERNAL_SERVER_ERROR.message;
      const resultErrorCode =
        ex.getResponse()['errorCode'] ||
        GeneralCode.INTERNAL_SERVER_ERROR.errorCode;
      const resultData = null;

      return CoreApiResponse.error(
        resultStatusCode,
        resultMessage,
        resultErrorCode,
        resultData,
      );
    } else if (ex instanceof CoreApiException) {
      const resultStatusCode =
        ex.statusCode || GeneralCode.INTERNAL_SERVER_ERROR.statusCode;
      const resultMessage =
        ex.message || GeneralCode.INTERNAL_SERVER_ERROR.message;
      const resultErrorCode =
        ex.errorCode || GeneralCode.INTERNAL_SERVER_ERROR.errorCode;
      const resultData = ex.data || null;

      return CoreApiResponse.error(
        resultStatusCode,
        resultMessage,
        resultErrorCode,
        resultData,
      );
    }
    const resultStatusCode = GeneralCode.INTERNAL_SERVER_ERROR.statusCode;
    const resultMessage =
      ex.message || GeneralCode.INTERNAL_SERVER_ERROR.message;
    return CoreApiResponse.error(resultStatusCode, resultMessage);
  }
}
