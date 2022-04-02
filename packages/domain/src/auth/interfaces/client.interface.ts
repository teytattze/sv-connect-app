import { ILoginPayload } from '../payloads/login.payload';
import { IAuthToken } from './auth-tokens.interface';
import { ICoreServiceResponse } from '../../common';

export interface IAuthClient {
  login?(payload: ILoginPayload): Promise<ICoreServiceResponse<IAuthToken>>;
  logout?(accountId: string): Promise<ICoreServiceResponse<null>>;
}
