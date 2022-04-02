import httpContext from 'express-http-context';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthCode, CoreHttpException, IAccount } from '@sv-connect/domain';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticationService: AuthenticationService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<IAccount> {
    const account = await this.authenticationService.validateAccount({
      email,
      password,
    });
    if (!account) throw CoreHttpException.new(AuthCode.INVALID_CREDENTIALS);
    httpContext.set('account', account);
    return account;
  }
}
