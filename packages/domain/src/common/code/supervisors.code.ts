import { BaseServiceCode, HttpStatus } from '../enums';
import { ICode } from './interface.code';

const ERROR_PREFIX = BaseServiceCode.SUPERVISORS;

export class SupervisorsCode {
  public static SUPERVISOR_NOT_FOUND: ICode = {
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: `${ERROR_PREFIX}000`,
    message: 'Supervisor not found',
  };
}
