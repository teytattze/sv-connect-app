import {
  ArgumentsHost,
  Catch,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import {
  CoreHttpException,
  CoreHttpResponse,
  GeneralCode,
} from '@sv-connect/domain';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(ex: CoreHttpException | HttpException | Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const apiResponseError = this.handleException(ex);
    response.status(apiResponseError.statusCode).send(apiResponseError);
  }

  private handleException(
    ex: HttpException | CoreHttpException | Error,
  ): CoreHttpResponse {
    if (ex instanceof HttpException) {
      const resultStatusCode =
        ex.getStatus() || GeneralCode.INTERNAL_SERVER_ERROR.statusCode;
      const resultMessage =
        ex.message || GeneralCode.INTERNAL_SERVER_ERROR.message;
      const resultErrorCode =
        ex.getResponse()['errorCode'] ||
        GeneralCode.INTERNAL_SERVER_ERROR.errorCode;
      const resultData = null;

      return CoreHttpResponse.error({
        statusCode: resultStatusCode,
        errorCode: resultErrorCode,
        message: resultMessage,
        data: resultData,
      });
    } else if (ex instanceof CoreHttpException) {
      const resultStatusCode =
        ex.statusCode || GeneralCode.INTERNAL_SERVER_ERROR.statusCode;
      const resultMessage =
        ex.message || GeneralCode.INTERNAL_SERVER_ERROR.message;
      const resultErrorCode =
        ex.errorCode || GeneralCode.INTERNAL_SERVER_ERROR.errorCode;
      const resultData = ex.data || null;

      return CoreHttpResponse.error({
        statusCode: resultStatusCode,
        errorCode: resultErrorCode,
        message: resultMessage,
        data: resultData,
      });
    }
    const resultStatusCode = GeneralCode.INTERNAL_SERVER_ERROR.statusCode;
    const resultMessage =
      ex.message || GeneralCode.INTERNAL_SERVER_ERROR.message;

    return CoreHttpResponse.error({
      statusCode: resultStatusCode,
      message: resultMessage,
    });
  }
}
