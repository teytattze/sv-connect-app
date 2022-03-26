import { ILoginPayload } from '../payloads/login.payload';
import { IRefreshAccessPayload } from '../payloads/refresh-access.payload';
import { IAuthTokens } from './auth-tokens.interface';

export interface IAuthService {
  login(payload: ILoginPayload): Promise<IAuthTokens>;
  logout(accountId: string): Promise<void>;
  refreshAccess(payload: IRefreshAccessPayload): Promise<IAuthTokens>;
}
