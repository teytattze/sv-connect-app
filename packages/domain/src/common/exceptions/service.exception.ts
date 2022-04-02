import { RpcException } from '@nestjs/microservices';
import { GeneralCode, ICode } from '../code';
import { ICoreServiceResponse } from '../responses';

export interface IFromServicePayload extends ICoreServiceResponse {}

export class CoreRpcException extends RpcException {
  constructor(code: ICode) {
    super(code);
  }

  public static new(code: ICode): CoreRpcException {
    return new CoreRpcException(code);
  }

  public static fromService({
    statusCode,
    errorCode,
    message,
  }: IFromServicePayload): CoreRpcException {
    const resultStatusCode =
      statusCode || GeneralCode.INTERNAL_SERVER_ERROR.statusCode;
    const resultErrorCode =
      errorCode || GeneralCode.INTERNAL_SERVER_ERROR.errorCode;
    const resultMessage = message || GeneralCode.INTERNAL_SERVER_ERROR.message;

    return new CoreRpcException({
      statusCode: resultStatusCode,
      errorCode: resultErrorCode,
      message: resultMessage,
    });
  }
}
