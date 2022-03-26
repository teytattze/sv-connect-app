import { BaseServiceCode, HttpStatus } from '../enums';
import { ICode } from './interface.code';

const ERROR_PREFIX = BaseServiceCode.AUTH;

export class AuthCode {
  public static INVALID_CREDENTIALS: ICode = {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: `${ERROR_PREFIX}000`,
    message: 'Unauthorized',
  };
}
