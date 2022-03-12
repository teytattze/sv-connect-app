import { ILoginPayload, IRefreshAccessPayload } from '../payloads/auth.payload';

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthService {
  login(payload: ILoginPayload): Promise<IAuthTokens>;
  logout(accountId: string): Promise<void>;
  refreshAccess(payload: IRefreshAccessPayload): Promise<IAuthTokens>;
}

export interface IAuthClient extends Partial<IAuthService> {}
