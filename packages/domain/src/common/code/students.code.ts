import { BaseServiceCode, HttpStatus } from '../enums';
import { ICode } from './interface.code';

const ERROR_PREFIX = BaseServiceCode.STUDENTS;

export class StudentsCode {
  public static STUDENT_NOT_FOUND: ICode = {
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: `${ERROR_PREFIX}000`,
    message: 'Student not found',
  };
}
