import { BaseServiceCode, HttpStatus } from '../enums';
import { ICode } from './interface.code';

const ERROR_PREFIX = BaseServiceCode.INVITATIONS;

export class InvitationsCode {
  public static INVITATION_NOT_FOUND: ICode = {
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: `${ERROR_PREFIX}000`,
    message: 'Invitation not found',
  };
}
