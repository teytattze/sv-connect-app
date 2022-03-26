import { BaseServiceCode, HttpStatus } from '../enums';
import { ICode } from './interface.code';

const ERROR_PREFIX = BaseServiceCode.ACCOUNTS;

export class AccountsCode {
  public static ACCOUNT_NOT_FOUND: ICode = {
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: `${ERROR_PREFIX}000`,
    message: 'Account not found',
  };

  public static ACCOUNT_EMAIL_EXISTS: ICode = {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: `${ERROR_PREFIX}001`,
    message: 'This email is already existed',
  };
}
