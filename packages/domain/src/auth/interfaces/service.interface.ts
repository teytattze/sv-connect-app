import { ILoginPayload } from '../payloads/login.payload';
import { IAuthToken } from './auth-tokens.interface';

export interface IAuthService {
  login(payload: ILoginPayload): Promise<IAuthToken>;
  logout(accountId: string): Promise<void>;
}
