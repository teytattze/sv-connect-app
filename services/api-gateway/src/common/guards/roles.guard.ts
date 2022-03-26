import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountRole } from '@prisma/client';
import { IAccount } from '@sv-connect/domain';
import httpContext from 'express-http-context';

export const ROLES_KEY = 'roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const roles = this.reflector.get<AccountRole[]>(
      ROLES_KEY,
      ctx.getHandler(),
    );

    if (!roles) return true;

    const account: IAccount = httpContext.get('account');

    return roles.includes(account.role);
  }
}
