import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  handleClientServiceError,
  ACCOUNTS_CLIENT,
  AccountsPattern,
} from '@sv-connect/common';
import {
  IAccount,
  IAccountsClient,
  ICreateAccountPayload,
  IUpdateAccountPayload,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AccountsService implements IAccountsClient {
  constructor(@Inject(ACCOUNTS_CLIENT) private readonly client: ClientProxy) {}

  async adminGetAccountByEmail(email: string): Promise<IAccount> {
    const [err, account] = await to(
      firstValueFrom(
        this.client.send(AccountsPattern.ADMIN_GET_ACCOUNT_BY_EMAIL, { email }),
      ),
    );
    if (err) handleClientServiceError(err);
    return account;
  }

  async indexAccounts(): Promise<IAccount[]> {
    const [err, accounts] = await to(
      firstValueFrom(this.client.send(AccountsPattern.INDEX_ACCOUNTS, {})),
    );
    if (err) handleClientServiceError(err);
    return accounts;
  }

  async getAccountById(id: string): Promise<IAccount> {
    const [err, account] = await to(
      firstValueFrom(
        this.client.send(AccountsPattern.GET_ACCOUNT_BY_ID, { id }),
      ),
    );
    if (err) handleClientServiceError(err);
    return account;
  }

  async getAccountByEmail(email: string): Promise<IAccount> {
    const [err, account] = await to(
      firstValueFrom(
        this.client.send(AccountsPattern.GET_ACCOUNT_BY_EMAIL, { email }),
      ),
    );
    if (err) handleClientServiceError(err);
    return account;
  }

  async registerAccount(payload: ICreateAccountPayload): Promise<IAccount> {
    const [err, account] = await to(
      firstValueFrom(
        this.client.send(AccountsPattern.CREATE_ACCOUNT, { data: payload }),
      ),
    );
    if (err) handleClientServiceError(err);
    return account;
  }

  async updateAccountById(
    id: string,
    payload: IUpdateAccountPayload,
  ): Promise<IAccount> {
    const [err, account] = await to(
      firstValueFrom(
        this.client.send(AccountsPattern.UPDATE_ACCOUNT_BY_ID, {
          id,
          data: payload,
        }),
      ),
    );
    if (err) handleClientServiceError(err);
    return account;
  }

  async deleteAccountById(id: string): Promise<void> {
    const [err] = await to(
      firstValueFrom(
        this.client.send(AccountsPattern.DELETE_ACCOUNT_BY_ID, { id }),
      ),
    );
    if (err) handleClientServiceError(err);
  }
}
