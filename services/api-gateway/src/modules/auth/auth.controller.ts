import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import config from 'config';
import { Request, Response } from 'express';
import { Auth } from '../../common/decorators/auth.decorator';
import { Account } from '../../common/decorators/account.decorator';
import { AuthService } from './auth.service';
import 'dotenv/config';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_HEADER_NAME,
  CoreApiResponse,
  LoginBody,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@sv-connect/domain';

@Controller('auth')
export class AuthController {
  private readonly accessTokenTTL: number;
  private readonly refreshTokenTTL: number;

  constructor(private readonly authService: AuthService) {
    this.accessTokenTTL = config.get<number>('jwt.ttl');
    this.refreshTokenTTL = config.get<number>('session.ttl');
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Authorized',
  })
  @ApiOperation({
    operationId: 'login',
    summary: 'Login by account email and password',
  })
  async login(
    @Body() body: LoginBody,
    @Res({ passthrough: true }) response: Response,
  ) {
    const {
      data: { accessToken, refreshToken },
    } = await this.authService.login(body);

    response.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      maxAge: this.refreshTokenTTL * 1000,
    });
    response.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      maxAge: this.refreshTokenTTL * 1000,
    });

    return CoreApiResponse.success(null, 'Login successfully');
  }

  @Auth()
  @Post('logout')
  @ApiResponse({
    status: 200,
    description: 'Logged Out',
  })
  @ApiOperation({
    operationId: 'logout',
    summary: 'Logout and clear cookies',
  })
  async logout(
    @Account('id') accountId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(accountId);

    response.clearCookie(ACCESS_TOKEN_COOKIE_NAME, { maxAge: 0 });
    response.clearCookie(REFRESH_TOKEN_COOKIE_NAME, { maxAge: 0 });

    return CoreApiResponse.success(null, 'Logout successfully');
  }

  @Post('access/refresh')
  @ApiResponse({
    status: 200,
    description: 'Authorizations Refreshed',
  })
  @ApiOperation({
    operationId: 'refreshAccess',
    summary: 'Refresh account access token with refresh token',
  })
  async refreshAccess(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies[REFRESH_TOKEN_COOKIE_NAME];
    const accessToken = request.headers[ACCESS_TOKEN_HEADER_NAME];

    const {
      data: { accessToken: newAccessToken, refreshToken: newRefreshToken },
    } = await this.authService.refreshAccess({ accessToken, refreshToken });

    response.cookie(ACCESS_TOKEN_COOKIE_NAME, newAccessToken, {
      maxAge: this.refreshTokenTTL * 1000,
    });
    response.cookie(REFRESH_TOKEN_COOKIE_NAME, newRefreshToken, {
      maxAge: this.refreshTokenTTL * 1000,
    });

    return CoreApiResponse.success(null, 'Access refresh successfully');
  }
}
