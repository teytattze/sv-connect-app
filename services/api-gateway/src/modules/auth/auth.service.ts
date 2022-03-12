import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  handleClientServiceError,
  AUTH_CLIENT,
  AuthPattern,
} from '@sv-connect/common';
import {
  IAuthClient,
  IAuthTokens,
  ILoginPayload,
  IRefreshAccessPayload,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements IAuthClient {
  constructor(@Inject(AUTH_CLIENT) private readonly authClient: ClientProxy) {}

  async login(payload: ILoginPayload): Promise<IAuthTokens> {
    const [err, tokens] = await to(
      firstValueFrom(
        this.authClient.send(AuthPattern.LOGIN, { data: payload }),
      ),
    );
    if (err) handleClientServiceError(err);
    return tokens;
  }

  async logout(accountId: string): Promise<void> {
    const [err] = await to(
      firstValueFrom(this.authClient.send(AuthPattern.LOGOUT, { accountId })),
    );
    if (err) handleClientServiceError(err);
  }

  async refreshAccess(payload: IRefreshAccessPayload): Promise<IAuthTokens> {
    const [err, tokens] = await to(
      firstValueFrom(
        this.authClient.send(AuthPattern.REFRESH_ACCESS, { data: payload }),
      ),
    );
    if (err) handleClientServiceError(err);
    return tokens;
  }
}
