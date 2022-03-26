import { HttpStatus } from '../enums';
import { ICode } from './interface.code';

export class GeneralCode {
  public static SUCCESS: ICode = {
    statusCode: HttpStatus.OK,
    errorCode: '',
    message: 'Ok',
  };

  public static BAD_REQUEST: ICode = {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: '',
    message: 'Bad request',
  };

  public static UNAUTHORIZED: ICode = {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: '',
    message: 'Unauthorized',
  };

  public static NOT_FOUND: ICode = {
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: '',
    message: 'Not found',
  };

  public static INTERNAL_SERVER_ERROR: ICode = {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode: '',
    message: 'Internal server error',
  };
}
