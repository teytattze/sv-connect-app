import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AccountRole } from '@prisma/client';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard, ROLES_KEY } from '../guards/roles.guard';

export interface IAuthDecorator {
  roles: AccountRole[];
}

export const Auth = (conditions?: IAuthDecorator) => {
  return applyDecorators(
    SetMetadata(ROLES_KEY, conditions?.roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
};
