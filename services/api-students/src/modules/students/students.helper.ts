import {
  PrismaErrorCode,
  GeneralCode,
  StudentsCode,
  CoreRpcException,
} from '@sv-connect/domain';
import { Prisma } from '@prisma/client';

export const handlePrismaError = <TError = any>(error: TError) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case PrismaErrorCode.NOT_FOUND:
        throw CoreRpcException.new(StudentsCode.STUDENT_NOT_FOUND);
      default:
        break;
    }
  }
  throw CoreRpcException.new(GeneralCode.INTERNAL_SERVER_ERROR);
};
