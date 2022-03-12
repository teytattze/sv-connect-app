import { ICreateSessionPayload } from '../payloads/sessions.payload';

export interface ISession {
  id: string;
  token: string | null;
  expiredAt: Date | null;
  accountId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISessionsService {
  getSessionByAccountId(accountId: string): Promise<ISession>;
  createSession(payload: ICreateSessionPayload): Promise<ISession>;
  initializeSessionByAccountId(accountId: string): Promise<ISession>;
  invalidateSessionByAccountId(accountId: string): Promise<ISession>;
}

export interface ISessionsClient extends Partial<ISessionsService> {}
