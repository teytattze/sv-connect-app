import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  AccountsCode,
  CoreRpcException,
  IAccount,
  IAccountsService,
  ICreateAccountPayload,
  IUpdateAccountPayload,
} from '@sv-connect/domain';
import * as bcrypt from 'bcryptjs';
import { AccountsRepository } from './accounts.repository';
import to from 'await-to-js';
import { handlePrismaError } from './accounts.helper';

@Injectable()
export class AccountsService implements IAccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async indexAccounts(): Promise<IAccount[]> {
    const [error, accounts] = await to(this.accountsRepository.findAccounts());
    if (error) handlePrismaError(error);
    return accounts;
  }

  async getAccountById(id: string): Promise<IAccount> {
    const [_, account] = await to(this.accountsRepository.findAccount({ id }));
    if (!account) throw CoreRpcException.new(AccountsCode.ACCOUNT_NOT_FOUND);
    return account;
  }

  async getAccountByEmail(email: string): Promise<IAccount> {
    const [_, account] = await to(
      this.accountsRepository.findAccount({ email }),
    );
    if (!account) throw CoreRpcException.new(AccountsCode.ACCOUNT_NOT_FOUND);
    return account;
  }

  async createAccount(payload: ICreateAccountPayload): Promise<IAccount> {
    const isExisted = await this.isAccountExistsByEmail(payload.email);
    if (isExisted)
      throw CoreRpcException.new(AccountsCode.ACCOUNT_EMAIL_EXISTS);

    const hashedPassword = await this.hashPassword(payload.password);
    const [error, newAccount] = await to<IAccount, any>(
      this.accountsRepository.createAccount({
        ...payload,
        password: hashedPassword,
      }),
    );

    if (error) handlePrismaError(error);
    return newAccount;
  }

  async updateAccountById(
    id: string,
    payload: IUpdateAccountPayload,
  ): Promise<IAccount> {
    const [error, account] = await to<IAccount, any>(
      this.accountsRepository.updateAccount({ id }, payload),
    );
    if (error) handlePrismaError(error);
    return account;
  }

  async deleteAccountById(id: string): Promise<void> {
    const [error] = await to<void, any>(
      this.accountsRepository.deleteAccount({ id }),
    );
    if (error) handlePrismaError(error);
  }

  async isAccountExistsByEmail(email: string): Promise<boolean> {
    const [error, account] = await to(
      this.accountsRepository.findAccount({ email }),
    );
    return error || !account ? false : true;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
