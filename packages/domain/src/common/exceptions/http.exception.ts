import { GeneralCode } from '../code';
import { ICoreServiceResponse } from '../responses';
import { Nullable } from '../types';

export interface ICoreHttpException<TData = unknown> {
  statusCode: number;
  message: string;
  errorCode: string;
  data: Nullable<TData>;
}

export interface ICoreHttpExceptionPayload<TData = unknown>
  extends Partial<ICoreHttpException<TData>> {}

export interface IFromServicePayload<TData = unknown>
  extends ICoreServiceResponse<TData> {}

export class CoreHttpException<TData = any> extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly data: Nullable<TData>;

  private constructor({
    statusCode,
    errorCode,
    message,
    data,
  }: ICoreHttpException<TData>) {
    super();

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.message = message;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }

  public static new<TData = unknown>({
    statusCode,
    errorCode,
    message,
    data,
  }: ICoreHttpExceptionPayload<TData>) {
    const resultStatusCode =
      statusCode || GeneralCode.INTERNAL_SERVER_ERROR.statusCode;
    const resultErrorCode = errorCode || '';
    const resultMessage = message || GeneralCode.INTERNAL_SERVER_ERROR.message;
    const resultData = data || null;

    return new CoreHttpException<TData>({
      statusCode: resultStatusCode,
      errorCode: resultErrorCode,
      message: resultMessage,
      data: resultData,
    });
  }

  public static fromService<TData = unknown>({
    statusCode,
    errorCode,
    message,
    data,
  }: IFromServicePayload<TData>): CoreHttpException<TData> {
    const resultStatusCode =
      statusCode || GeneralCode.INTERNAL_SERVER_ERROR.statusCode;
    const resultErrorCode = errorCode || '';
    const resultMessage = message || GeneralCode.INTERNAL_SERVER_ERROR.message;
    const resultData = data || null;

    return new CoreHttpException<TData>({
      statusCode: resultStatusCode,
      errorCode: resultErrorCode,
      message: resultMessage,
      data: resultData,
    });
  }
}
