import { RpcException } from '@nestjs/microservices';
import { PrismaErrorCode, ServiceError } from '@sv-connect/domain';
import { Prisma } from '@prisma/client';

export const handleRepositoryError = (err: any) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case PrismaErrorCode.NOT_FOUND:
        throw new RpcException(ServiceError.ACCOUNT_NOT_FOUND);
      case PrismaErrorCode.UNIQUE_CONSTRAINT:
        throw new RpcException(ServiceError.ACCOUNT_EMAIL_EXISTS);
      default:
        break;
    }
  }
  throw new RpcException(ServiceError.UNKNOWN);
};
