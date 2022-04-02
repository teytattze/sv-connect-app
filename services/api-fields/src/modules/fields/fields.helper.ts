import {
  PrismaErrorCode,
  GeneralCode,
  FieldsCode,
  CoreRpcException,
} from '@sv-connect/domain';
import { Prisma } from '@prisma/client';

export const handlePrismaError = <TError = any>(error: TError) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case PrismaErrorCode.NOT_FOUND:
        throw CoreRpcException.new(FieldsCode.FIELD_NOT_FOUND);
      case PrismaErrorCode.UNIQUE_CONSTRAINT:
        throw CoreRpcException.new(FieldsCode.FIELD_EXISTS);
      default:
        break;
    }
  }
  throw CoreRpcException.new(GeneralCode.INTERNAL_SERVER_ERROR);
};
