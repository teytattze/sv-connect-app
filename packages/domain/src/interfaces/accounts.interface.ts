import {
  ICreateAccountPayload,
  IUpdateAccountPayload,
} from '../payloads/accounts.payload';
import { AccountRole } from '../enums/accounts.enum';

export interface IAccount {
  id: string;
  email: string;
  emailVerified: boolean;
  password?: string;
  role: AccountRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAccountsService {
  indexAccounts(): Promise<IAccount[]>;
  getAccountByEmail(email: string): Promise<IAccount>;
  getAccountById(id: string): Promise<IAccount>;
  registerAccounts(payload: ICreateAccountPayload): Promise<IAccount>;
  updateAccountById(
    id: string,
    payload: IUpdateAccountPayload,
  ): Promise<IAccount>;
  deleteAccountById(id: string): Promise<void>;
}

export interface IAccountsClient extends Partial<IAccountsService> {}

export interface IAdminAccountsService {
  adminGetAccountByEmail(email: string): Promise<IAccount>;
}

export interface IAdminAccountsClient extends Partial<IAdminAccountsService> {}
