import { Nullable, Optional } from '../types';
import { ICoreApiResponse } from './response.api';

export interface ICoreApiException<TData = any> {
  statusCode: number;
  message: string;
  errorCode: string;
  data: Nullable<TData>;
}

export class CoreApiException<TData = any>
  extends Error
  implements ICoreApiException<TData>
{
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly data: Optional<TData>;

  private constructor(
    apiResponse: ICoreApiResponse<any>,
    message?: string,
    data?: TData,
  ) {
    super();

    this.name = this.constructor.name;
    this.statusCode = apiResponse.statusCode;
    this.message = message || apiResponse.message;
    this.errorCode = apiResponse.errorCode;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }

  public static new<TData>(
    apiResponse: ICoreApiResponse<any>,
    message?: string,
    data?: TData,
  ): CoreApiException<TData> {
    return new CoreApiException(apiResponse, message, data);
  }
}
