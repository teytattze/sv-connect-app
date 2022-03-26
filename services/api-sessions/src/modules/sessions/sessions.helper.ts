import { RpcException } from '@nestjs/microservices';
import { PrismaErrorCode, AccountsCode, GeneralCode } from '@sv-connect/domain';
import { Prisma } from '@prisma/client';

// TODO: Create Sessions Errors
export const handleServiceError = (err: any) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case PrismaErrorCode.NOT_FOUND:
        throw new RpcException(AccountsCode.ACCOUNT_NOT_FOUND);
      case PrismaErrorCode.UNIQUE_CONSTRAINT:
        throw new RpcException(AccountsCode.ACCOUNT_EMAIL_EXISTS);
      default:
        break;
    }
  }
  throw new RpcException(GeneralCode.INTERNAL_SERVER_ERROR);
};
