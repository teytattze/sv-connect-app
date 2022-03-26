import { BaseServiceCode, HttpStatus } from '../enums';
import { ICode } from './interface.code';

const ERROR_PREFIX = BaseServiceCode.PROFILES;

export class ProfilesCode {
  public static PROFILE_NOT_FOUND: ICode = {
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: `${ERROR_PREFIX}000`,
    message: 'Profile not found',
  };
}
