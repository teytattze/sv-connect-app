import { RpcException } from '@nestjs/microservices';
import { PrismaErrorCode, GeneralCode, FieldsCode } from '@sv-connect/domain';
import { Prisma } from '@prisma/client';

export const handlePrismaError = <TError = any>(error: TError) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case PrismaErrorCode.NOT_FOUND:
        throw new RpcException(FieldsCode.FIELD_NOT_FOUND);
      case PrismaErrorCode.UNIQUE_CONSTRAINT:
        throw new RpcException(FieldsCode.FIELD_EXISTS);
      default:
        break;
    }
  }
  throw new RpcException(GeneralCode.INTERNAL_SERVER_ERROR);
};
