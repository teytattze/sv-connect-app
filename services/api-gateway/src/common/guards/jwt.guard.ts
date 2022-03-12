import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import httpContext from 'express-http-context';
import { ACCESS_TOKEN_HEADER_NAME } from '@sv-connect/domain';
import { JwtService } from '../../modules/jwt/jwt.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const accessToken = request.headers[ACCESS_TOKEN_HEADER_NAME];

    const payload = await this.jwtService.verifyJwt(accessToken);

    if (!payload || !payload.account) return false;

    httpContext.set('account', payload.account);

    return true;
  }
}
