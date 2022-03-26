import { RpcException } from '@nestjs/microservices';
import { PrismaErrorCode, GeneralCode, ProfilesCode } from '@sv-connect/domain';
import { Prisma } from '@prisma/client';

export const handlePrismaError = <TError = any>(error: TError) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case PrismaErrorCode.NOT_FOUND:
        throw new RpcException(ProfilesCode.PROFILE_NOT_FOUND);
      default:
        break;
    }
  }
  throw new RpcException(GeneralCode.INTERNAL_SERVER_ERROR);
};
