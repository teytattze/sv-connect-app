import { GeneralCode } from '../code';
import { Nullable } from '../types';

export interface ICoreHttpResponse<TData = unknown> {
  statusCode: number;
  errorCode: string;
  message: string;
  data: Nullable<TData>;
}

export interface ICoreHttpResponsePayload<TData = unknown>
  extends Partial<ICoreHttpResponse<TData>> {}

export class CoreHttpResponse<TData = unknown> {
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
  }: ICoreHttpResponse<TData>) {
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
  }: ICoreHttpResponsePayload<TData>): CoreHttpResponse<TData> {
    const resultStatusCode = statusCode || GeneralCode.SUCCESS.statusCode;
    const resultErrorCode = errorCode || '';
    const resultMessage = message || GeneralCode.SUCCESS.message;
    const resultData = data || null;

    return new CoreHttpResponse({
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
  }: ICoreHttpResponsePayload<TData>): CoreHttpResponse<TData> {
    const resultStatusCode =
      statusCode || GeneralCode.INTERNAL_SERVER_ERROR.statusCode;
    const resultErrorCode = errorCode || '';
    const resultMessage = message || GeneralCode.INTERNAL_SERVER_ERROR.message;
    const resultData = data || null;

    return new CoreHttpResponse({
      statusCode: resultStatusCode,
      errorCode: resultErrorCode,
      message: resultMessage,
      data: resultData,
    });
  }
}
