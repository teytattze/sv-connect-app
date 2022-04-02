import { GeneralCode } from '../code';
import { Nullable } from '../types';

export interface ICoreServiceResponse<TData = unknown> {
  statusCode: number;
  errorCode: string;
  message: string;
  data: Nullable<TData>;
}

export interface ICoreServiceResponsePayload<TData = unknown>
  extends Partial<ICoreServiceResponse<TData>> {}

export class CoreServiceResponse<TData = unknown> {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly errorCode: string;
  public readonly data: Nullable<TData>;
  public readonly timestamp: number;

  private constructor({
    statusCode,
    errorCode,
    message,
    data,
  }: ICoreServiceResponse<TData>) {
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.message = message;
    this.data = data;
    this.timestamp = Date.now();
  }

  public static success<TData = unknown>({
    statusCode,
    errorCode,
    message,
    data,
  }: ICoreServiceResponsePayload<TData>): CoreServiceResponse<TData> {
    const resultStatusCode = statusCode || GeneralCode.SUCCESS.statusCode;
    const resultErrorCode = errorCode || '';
    const resultMessage = message || GeneralCode.SUCCESS.message;
    const resultData = data || null;

    return new CoreServiceResponse({
      statusCode: resultStatusCode,
      errorCode: resultErrorCode,
      message: resultMessage,
      data: resultData,
    });
  }

  public static error<TData = unknown>({
    statusCode,
    errorCode,
    message,
    data,
  }: ICoreServiceResponsePayload<TData>): CoreServiceResponse<TData> {
    const resultStatusCode =
      statusCode || GeneralCode.INTERNAL_SERVER_ERROR.statusCode;
    const resultErrorCode = errorCode || '';
    const resultMessage = message || GeneralCode.INTERNAL_SERVER_ERROR.message;
    const resultData = data || null;

    return new CoreServiceResponse({
      statusCode: resultStatusCode,
      errorCode: resultErrorCode,
      message: resultMessage,
      data: resultData,
    });
  }
}
