import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  handleClientServiceError,
  SESSIONS_CLIENT,
  SessionsPattern,
} from '@sv-connect/common';
import { ISession, ISessionsClient } from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SessionsService implements ISessionsClient {
  constructor(
    @Inject(SESSIONS_CLIENT) private readonly sessionsClient: ClientProxy,
  ) {}

  async getSessionByAccountId(accountId: string): Promise<ISession> {
    const [err, session] = await to(
      firstValueFrom(
        this.sessionsClient.send(SessionsPattern.GET_SESSION_BY_ACCOUNT_ID, {
          accountId,
        }),
      ),
    );
    if (err) handleClientServiceError(err);
    return session;
  }

  async initializeSessionByAccountId(accountId: string): Promise<ISession> {
    const [err, session] = await to(
      firstValueFrom(
        this.sessionsClient.send(SessionsPattern.INITIALIZE_SESSION, {
          accountId,
        }),
      ),
    );
    if (err) handleClientServiceError(err);
    return session;
  }

  async invalidateSessionByAccountId(accountId: string): Promise<ISession> {
    const [err, session] = await to(
      firstValueFrom(
        this.sessionsClient.send(SessionsPattern.INVALIDATE_SESSION, {
          accountId,
        }),
      ),
    );
    if (err) handleClientServiceError(err);
    return session;
  }
}
