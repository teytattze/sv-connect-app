import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_CLIENT, AuthPattern } from '@sv-connect/common';
import {
  CoreApiException,
  ICoreApiResponse,
  IAuthTokens,
  ILoginPayload,
  IRefreshAccessPayload,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject(AUTH_CLIENT) private readonly authClient: ClientProxy) {}

  async login(payload: ILoginPayload): Promise<ICoreApiResponse<IAuthTokens>> {
    const [error, tokens] = await to<
      ICoreApiResponse<IAuthTokens>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.authClient.send(AuthPattern.LOGIN, { data: payload }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return tokens;
  }

  async logout(accountId: string): Promise<ICoreApiResponse<null>> {
    const [error, result] = await to<
      ICoreApiResponse<null>,
      ICoreApiResponse<null>
    >(firstValueFrom(this.authClient.send(AuthPattern.LOGOUT, { accountId })));
    if (error) throw CoreApiException.new(error);
    return result;
  }

  async refreshAccess(
    payload: IRefreshAccessPayload,
  ): Promise<ICoreApiResponse<IAuthTokens>> {
    const [error, tokens] = await to<
      ICoreApiResponse<IAuthTokens>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.authClient.send(AuthPattern.REFRESH_ACCESS, { data: payload }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return tokens;
  }
}
