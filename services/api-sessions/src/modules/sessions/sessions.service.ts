import { Injectable } from '@nestjs/common';
import { getExpiredDate } from '@sv-connect/common';
import { ICreateSessionPayload, ISession } from '@sv-connect/domain';
import config from 'config';
import { randomBytes } from 'crypto';
import { SessionsRepository } from './sessions.repository';
import 'dotenv/config';

@Injectable()
export class SessionsService {
  private readonly bytes: number;
  private readonly ttl: number;

  constructor(private readonly sessionsRepository: SessionsRepository) {
    this.bytes = config.get<number>('session.bytes');
    this.ttl = config.get<number>('session.ttl');
  }

  async getSessionByAccountId(accountId: string): Promise<ISession> {
    return await this.sessionsRepository.findSession({ accountId });
  }

  async registerSession(payload: ICreateSessionPayload): Promise<ISession> {
    return await this.sessionsRepository.createSession(payload);
  }

  async initializeSession(accountId: string): Promise<ISession> {
    const token = this.getSessionToken();
    const expiredAt = getExpiredDate(this.ttl);

    return await this.sessionsRepository.updateSession(
      { accountId },
      { token, expiredAt },
    );
  }

  async invalidateSession(accountId: string): Promise<ISession> {
    return await this.sessionsRepository.updateSession(
      { accountId },
      { token: null, expiredAt: null },
    );
  }

  private getSessionToken(): string {
    return randomBytes(this.bytes).toString('hex');
  }
}
