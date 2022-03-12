import {
  AccountsErrorCode,
  AuthErrorCode,
  BaseServiceCode,
  GeneralErrorCode,
  HttpStatus,
} from './errors.enum';
import { getErrorCode } from './errors.helper';

export const AccountsServiceError = {
  ACCOUNT_NOT_FOUND: {
    message: 'Account not found',
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: getErrorCode(
      BaseServiceCode.ACCOUNTS,
      AccountsErrorCode.ACCOUNT_NOT_FOUND,
    ),
  },
  ACCOUNT_EMAIL_EXISTS: {
    message: 'This email is existed',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: getErrorCode(
      BaseServiceCode.ACCOUNTS,
      AccountsErrorCode.ACCOUNT_EMAIL_EXISTS,
    ),
  },
};

export const AuthServiceError = {
  INVALID_CREDENTIALS: {
    message: 'Invalid credentials',
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: getErrorCode(
      BaseServiceCode.AUTH,
      AuthErrorCode.INVALID_CREDENTIALS,
    ),
  },
};

export const GeneralServiceError = {
  UNKNOWN: {
    message: 'An unknown error occurred',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode: getErrorCode(BaseServiceCode.GENERAL, GeneralErrorCode.UNKNOWN),
  },
  BAD_REQUEST: {
    message: 'Bad request',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: getErrorCode(
      BaseServiceCode.GENERAL,
      GeneralErrorCode.BAD_REQUEST,
    ),
  },
  NOT_FOUND: {
    message: 'Not found',
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: getErrorCode(
      BaseServiceCode.GENERAL,
      GeneralErrorCode.NOT_FOUND,
    ),
  },
  UNAUTHORIZED: {
    message: 'Unauthorized',
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: getErrorCode(
      BaseServiceCode.GENERAL,
      GeneralErrorCode.UNAUTHORIZED,
    ),
  },
};

export const ServiceError = {
  ...GeneralServiceError,
  ...AccountsServiceError,
  ...AuthServiceError,
};
