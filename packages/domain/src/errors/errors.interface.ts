import { HttpStatus } from './errors.enum';

export interface IResponseError {
  message: string;
  errorCode: string;
  statusCode: HttpStatus;
}
