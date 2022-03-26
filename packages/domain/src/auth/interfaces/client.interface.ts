import { ILoginPayload } from '../payloads/login.payload';
import { IRefreshAccessPayload } from '../payloads/refresh-access.payload';
import { IAuthTokens } from './auth-tokens.interface';
import { ICoreApiResponse } from '../../common/api';

export interface IAuthClient {
  login?(payload: ILoginPayload): Promise<ICoreApiResponse<IAuthTokens>>;
  logout?(accountId: string): Promise<ICoreApiResponse<null>>;
  refreshAccess?(
    payload: IRefreshAccessPayload,
  ): Promise<ICoreApiResponse<IAuthTokens>>;
}
