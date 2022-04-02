import { Controller, Post, Response, UseGuards } from '@nestjs/common';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCOUNT_COOKIE_NAME,
  CoreHttpResponse,
  IAccount,
} from '@sv-connect/domain';
import config from 'config';
import { Response as IResponse } from 'express';
import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard } from '../../common/guards/local.guard';
import { Account } from '../../common/decorators/account.decorator';
import 'dotenv/config';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@Controller('authentication')
export class AuthenticationController {
  private accessTokenTTL: number;

  constructor(private readonly authenticationService: AuthenticationService) {
    this.accessTokenTTL = config.get<number>('jwt.ttl');
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Account() account: IAccount,
    @Response({ passthrough: true }) response: IResponse,
  ): Promise<CoreHttpResponse<null>> {
    const { accessToken } = await this.authenticationService.login(account);
    response.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      maxAge: this.accessTokenTTL * 1000,
      httpOnly: true,
    });
    response.cookie(ACCOUNT_COOKIE_NAME, account, {
      maxAge: this.accessTokenTTL * 1000,
    });
    return CoreHttpResponse.success({
      message: 'Login successfully',
    });
  }

  @Post('logout')
  async logout(
    @Response({ passthrough: true }) response: IResponse,
  ): Promise<CoreHttpResponse<null>> {
    response.clearCookie(ACCESS_TOKEN_COOKIE_NAME, { maxAge: 0 });
    response.clearCookie(ACCOUNT_COOKIE_NAME, { maxAge: 0 });
    return CoreHttpResponse.success({
      message: 'Logout successfully',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('jwt/validate')
  async jwtValidate() {
    return CoreHttpResponse.success({
      message: 'Jwt validate successfully',
    });
  }
}
