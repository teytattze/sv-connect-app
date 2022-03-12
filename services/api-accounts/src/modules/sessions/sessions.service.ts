import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  handleClientServiceError,
  SESSIONS_CLIENT,
  SessionsPattern,
} from '@sv-connect/common';
import {
  ICreateSessionPayload,
  ISession,
  ISessionsClient,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SessionsService implements ISessionsClient {
  constructor(@Inject(SESSIONS_CLIENT) private readonly client: ClientProxy) {}

  async createSession(payload: ICreateSessionPayload): Promise<ISession> {
    const [err, session] = await to(
      firstValueFrom(
        this.client.send(SessionsPattern.CREATE_SESSION, { data: payload }),
      ),
    );
    if (err) handleClientServiceError(err);
    return session;
  }
}
