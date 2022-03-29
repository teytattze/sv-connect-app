import { BaseServiceCode, HttpStatus } from '../enums';
import { ICode } from './interface.code';

const ERROR_PREFIX = BaseServiceCode.FIELDS;

export class FieldsCode {
  public static FIELD_NOT_FOUND: ICode = {
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: `${ERROR_PREFIX}000`,
    message: 'Field not found',
  };

  public static FIELD_EXISTS: ICode = {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: `${ERROR_PREFIX}001`,
    message: 'This field is already existed',
  };

  public static FIELD_TITLE_EXISTS: ICode = {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: `${ERROR_PREFIX}002`,
    message: 'This field title is already existed',
  };
}
