import {
  PrismaErrorCode,
  GeneralCode,
  SpecializationsCode,
  CoreRpcException,
} from '@sv-connect/domain';
import { Prisma } from '@prisma/client';

export const handlePrismaError = <TError = any>(error: TError) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case PrismaErrorCode.NOT_FOUND:
        throw CoreRpcException.new(
          SpecializationsCode.SPECIALIZATION_NOT_FOUND,
        );
      case PrismaErrorCode.UNIQUE_CONSTRAINT:
        throw CoreRpcException.new(SpecializationsCode.SPECIALIZATION_EXISTS);
      default:
        break;
    }
  }
  throw CoreRpcException.new(GeneralCode.INTERNAL_SERVER_ERROR);
};
