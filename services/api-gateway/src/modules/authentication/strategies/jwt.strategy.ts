import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'jsonwebtoken';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ACCESS_TOKEN_COOKIE_NAME, IAccount } from '@sv-connect/domain';
import { Request } from 'express';
import httpContext from 'express-http-context';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate({ account }: JwtPayload & { account: IAccount }) {
    httpContext.set('account', account);
    return account;
  }
}

const cookieExtractor = (req: Request) => {
  const cookie = req.cookies[ACCESS_TOKEN_COOKIE_NAME];
  return cookie || null;
};
