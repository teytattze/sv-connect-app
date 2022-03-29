import { BaseServiceCode, HttpStatus } from '../enums';
import { ICode } from './interface.code';

const ERROR_PREFIX = BaseServiceCode.SPECIALIZATIONS;

export class SpecializationsCode {
  public static SPECIALIZATION_NOT_FOUND: ICode = {
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: `${ERROR_PREFIX}000`,
    message: 'Specialization not found',
  };

  public static SPECIALIZATION_EXISTS: ICode = {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: `${ERROR_PREFIX}001`,
    message: 'This specialization is already existed',
  };

  public static SPECIALIZATION_TITLE_EXISTS: ICode = {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: `${ERROR_PREFIX}002`,
    message: 'This specialization title is already existed',
  };
}
