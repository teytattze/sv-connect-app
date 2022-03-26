import { ICreateSessionPayload } from '../payloads/create-session.payload';
import { ISession } from './session.interface';

export interface ISessionsService {
  getSessionByAccountId(accountId: string): Promise<ISession>;
  createSession(payload: ICreateSessionPayload): Promise<ISession>;
  initializeSessionByAccountId(accountId: string): Promise<ISession>;
  invalidateSessionByAccountId(accountId: string): Promise<ISession>;
}
