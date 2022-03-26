import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SESSIONS_CLIENT, SessionsPattern } from '@sv-connect/common';
import {
  CoreApiException,
  ICoreApiResponse,
  ISession,
  ISessionsClient,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SessionsService implements ISessionsClient {
  constructor(
    @Inject(SESSIONS_CLIENT) private readonly sessionsClient: ClientProxy,
  ) {}

  async getSessionByAccountId(
    accountId: string,
  ): Promise<ICoreApiResponse<ISession>> {
    const [error, session] = await to<
      ICoreApiResponse<ISession>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.sessionsClient.send(SessionsPattern.GET_SESSION_BY_ACCOUNT_ID, {
          accountId,
        }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return session;
  }

  async initializeSessionByAccountId(
    accountId: string,
  ): Promise<ICoreApiResponse<ISession>> {
    const [error, session] = await to<
      ICoreApiResponse<ISession>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.sessionsClient.send(
          SessionsPattern.INITIALIZE_SESSION_BY_ACCOUNT_ID,
          { accountId },
        ),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return session;
  }

  async invalidateSessionByAccountId(
    accountId: string,
  ): Promise<ICoreApiResponse<ISession>> {
    const [error, session] = await to<
      ICoreApiResponse<ISession>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.sessionsClient.send(
          SessionsPattern.INVALIDATE_SESSION_BY_ACCOUNT_ID,
          { accountId },
        ),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return session;
  }
}
