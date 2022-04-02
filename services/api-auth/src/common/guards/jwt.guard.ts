import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCode, CoreHttpException } from '@sv-connect/domain';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(ctx: ExecutionContext) {
    return super.canActivate(ctx);
  }

  handleRequest<IAccount>(error, account, info): IAccount {
    if (error || info)
      throw CoreHttpException.new({
        ...AuthCode.INVALID_CREDENTIALS,
        message: 'Invalid access token',
      });
    return account;
  }
}
