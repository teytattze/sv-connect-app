import { Injectable, UnauthorizedException } from '@nestjs/common';
import { isExpired } from '@sv-connect/common';
import { ILoginPayload, IRefreshAccessPayload } from '@sv-connect/domain';
import * as bcrypt from 'bcryptjs';
import config from 'config';
import { AdminAccountsService } from '../accounts/accounts.admin.service';
import { JwtService } from '../jwt/jwt.service';
import { SessionsService } from '../sessions/sessions.service';
import 'dotenv/config';

@Injectable()
export class AuthenticationService {
  private readonly refreshTokenTtl: number;

  constructor(
    private readonly adminAcountsService: AdminAccountsService,
    private readonly jwtService: JwtService,
    private readonly sessionsService: SessionsService,
  ) {
    this.refreshTokenTtl = config.get<number>('session.ttl');
  }

  async login(payload: ILoginPayload) {
    const { data: account } = await this.adminAcountsService.getAccountByEmail(
      payload.email,
    );
    if (!account) throw new UnauthorizedException();
    const isMatched = await this.compareHashedPassword(
      payload.password,
      account.password,
    );
    if (!isMatched) {
      throw new UnauthorizedException();
    }
    const accessToken = await this.jwtService.createJwt({
      id: account.id,
      email: account.email,
      emailVerified: account.emailVerified,
      role: account.role,
    });

    const { data: session } =
      await this.sessionsService.initializeSessionByAccountId(account.id);

    return {
      accessToken,
      refreshToken: session.token,
    };
  }

  async logout(accountId: string) {
    return await this.sessionsService.invalidateSessionByAccountId(accountId);
  }

  async refreshAccess(payload: IRefreshAccessPayload) {
    const { accessToken, refreshToken } = payload;

    if (!refreshToken || !accessToken) {
      throw new UnauthorizedException();
    }

    const { account } = await this.jwtService.verifyJwt(accessToken, {
      clockTolerance: this.refreshTokenTtl,
    });

    const { data: session } = await this.sessionsService.getSessionByAccountId(
      account.id,
    );

    if (
      !session.token ||
      !session.expiredAt ||
      session.token !== refreshToken ||
      isExpired(session.expiredAt)
    ) {
      await this.sessionsService.invalidateSessionByAccountId(account.id);
      throw new UnauthorizedException();
    }

    const newAccessToken = await this.jwtService.createJwt({
      id: account.id,
      email: account.email,
      emailVerified: account.emailVerified,
      role: account.role,
    });
    const { data: newSession } =
      await this.sessionsService.initializeSessionByAccountId(account.id);

    return {
      accessToken: newAccessToken,
      refreshToken: newSession.token,
    };
  }

  private async compareHashedPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
