import { Injectable } from '@nestjs/common';
import { getExpiredDate } from '@sv-connect/common';
import {
  ICreateSessionPayload,
  ISession,
  ISessionsService,
} from '@sv-connect/domain';
import to from 'await-to-js';
import config from 'config';
import { randomBytes } from 'crypto';
import { SessionsRepository } from './sessions.repository';
import { handleServiceError } from './sessions.helper';
import 'dotenv/config';

@Injectable()
export class SessionsService implements ISessionsService {
  private readonly bytes: number;
  private readonly ttl: number;

  constructor(private readonly sessionsRepository: SessionsRepository) {
    this.bytes = config.get<number>('session.bytes');
    this.ttl = config.get<number>('session.ttl');
  }

  async getSessionByAccountId(accountId: string): Promise<ISession> {
    const [error, session] = await to<ISession, any>(
      this.sessionsRepository.findSession({ accountId }),
    );
    if (error) handleServiceError(error);
    return session;
  }

  async createSession(payload: ICreateSessionPayload): Promise<ISession> {
    const [error, session] = await to<ISession, any>(
      this.sessionsRepository.createSession(payload),
    );
    if (error) handleServiceError(error);
    return session;
  }

  async initializeSessionByAccountId(accountId: string): Promise<ISession> {
    const token = this.getSessionToken();
    const expiredAt = getExpiredDate(this.ttl);

    const [error, session] = await to<ISession, any>(
      this.sessionsRepository.updateSession(
        { accountId },
        { token, expiredAt },
      ),
    );
    if (error) handleServiceError(error);
    return session;
  }

  async invalidateSessionByAccountId(accountId: string): Promise<ISession> {
    const [error, session] = await to(
      this.sessionsRepository.updateSession(
        { accountId },
        { token: null, expiredAt: null },
      ),
    );
    if (error) handleServiceError(error);
    return session;
  }

  private getSessionToken(): string {
    return randomBytes(this.bytes).toString('hex');
  }
}
