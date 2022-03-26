import { GeneralCode } from '../code';
import { Nullable } from '../types';

export interface ICoreApiResponse<TData = any> {
  statusCode: number;
  message: string;
  errorCode: string;
  data: Nullable<TData>;
  timestamp: number;
}

export class CoreApiResponse<TData = any> implements ICoreApiResponse<TData> {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly message: string;
  public readonly data: Nullable<TData>;
  public readonly timestamp: number;

  private constructor(
    statusCode: number,
    message: string,
    errorCode?: string,
    data?: TData,
  ) {
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.message = message;
    this.data = data || null;
    this.timestamp = Date.now();
  }

  public static success<TData>(
    data?: TData,
    message?: string,
  ): CoreApiResponse<TData> {
    const resultStatusCode: number = GeneralCode.SUCCESS.statusCode || 200;
    const resultMessage: string = message || GeneralCode.SUCCESS.message;
    const resultErrorCode: string = '';
    const resultData: TData = data || null;

    return new CoreApiResponse(
      resultStatusCode,
      resultMessage,
      resultErrorCode,
      resultData,
    );
  }

  public static error<TData>(
    statusCode?: number,
    message?: string,
    errorCode?: string,
    data?: TData,
  ): CoreApiResponse<TData> {
    const resultStatusCode: number =
      statusCode || GeneralCode.INTERNAL_SERVER_ERROR.statusCode;
    const resultErrorCode: string =
      errorCode || GeneralCode.INTERNAL_SERVER_ERROR.errorCode;
    const resultMessage: string =
      message || GeneralCode.INTERNAL_SERVER_ERROR.message;
    const resultData: TData = data || null;

    return new CoreApiResponse(
      resultStatusCode,
      resultMessage,
      resultErrorCode,
      resultData,
    );
  }
}
