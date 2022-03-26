import { ICoreApiResponse } from '../../common/api';
import { ICreateSessionPayload } from '../payloads/create-session.payload';
import { ISession } from './session.interface';

export interface ISessionsClient {
  getSessionByAccountId?(
    accountId: string,
  ): Promise<ICoreApiResponse<ISession>>;
  createSession?(
    payload: ICreateSessionPayload,
  ): Promise<ICoreApiResponse<ISession>>;
  initializeSessionByAccountId?(
    accountId: string,
  ): Promise<ICoreApiResponse<ISession>>;
  invalidateSessionByAccountId?(
    accountId: string,
  ): Promise<ICoreApiResponse<ISession>>;
}
