import { ICreateAccountPayload } from '../payloads/create-account.payload';
import { IUpdateAccountPayload } from '../payloads/update-account.payload';
import { IAccount } from './account.interface';
import { ICoreApiResponse } from '../../common/api';

export interface IAccountsClient {
  indexAccounts?(): Promise<ICoreApiResponse<IAccount[]>>;
  getAccountByEmail?(email: string): Promise<ICoreApiResponse<IAccount>>;
  getAccountById?(id: string): Promise<ICoreApiResponse<IAccount>>;
  createAccount?(
    payload: ICreateAccountPayload,
  ): Promise<ICoreApiResponse<IAccount>>;
  updateAccountById?(
    id: string,
    payload: IUpdateAccountPayload,
  ): Promise<ICoreApiResponse<IAccount>>;
  deleteAccountById?(id: string): Promise<ICoreApiResponse<null>>;
}

export interface IAdminAccountsClient {
  getAccountByEmail?(email: string): Promise<ICoreApiResponse<IAccount>>;
}
