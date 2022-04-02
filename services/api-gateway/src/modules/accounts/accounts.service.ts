import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ACCOUNTS_CLIENT, AccountsPattern } from '@sv-connect/common';
import {
  CoreHttpException,
  IAccount,
  IAccountsClient,
  ICoreServiceResponse,
  ICreateAccountPayload,
  IUpdateAccountPayload,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AccountsService implements IAccountsClient {
  constructor(@Inject(ACCOUNTS_CLIENT) private readonly client: ClientProxy) {}

  async adminGetAccountByEmail(
    email: string,
  ): Promise<ICoreServiceResponse<IAccount>> {
    const [error, account] = await to<
      ICoreServiceResponse<IAccount>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(AccountsPattern.ADMIN_GET_ACCOUNT_BY_EMAIL, { email }),
      ),
    );
    if (error) throw CoreHttpException.fromService(error);
    return account;
  }

  async indexAccounts(): Promise<ICoreServiceResponse<IAccount[]>> {
    const [error, accounts] = await to<
      ICoreServiceResponse<IAccount[]>,
      ICoreServiceResponse<null>
    >(firstValueFrom(this.client.send(AccountsPattern.INDEX_ACCOUNTS, {})));
    if (error) throw CoreHttpException.fromService(error);
    return accounts;
  }

  async getAccountById(id: string): Promise<ICoreServiceResponse<IAccount>> {
    const [error, account] = await to<
      ICoreServiceResponse<IAccount>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(AccountsPattern.GET_ACCOUNT_BY_ID, { id }),
      ),
    );
    if (error) throw CoreHttpException.fromService(error);
    return account;
  }

  async getAccountByEmail(
    email: string,
  ): Promise<ICoreServiceResponse<IAccount>> {
    const [error, account] = await to<
      ICoreServiceResponse<IAccount>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(AccountsPattern.GET_ACCOUNT_BY_EMAIL, { email }),
      ),
    );
    if (error) throw CoreHttpException.fromService(error);
    return account;
  }

  async createAccount(
    payload: ICreateAccountPayload,
  ): Promise<ICoreServiceResponse<IAccount>> {
    const [error, account] = await to<
      ICoreServiceResponse<IAccount>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(AccountsPattern.CREATE_ACCOUNT, { data: payload }),
      ),
    );
    if (error) throw CoreHttpException.fromService(error);
    return account;
  }

  async updateAccountById(
    id: string,
    payload: IUpdateAccountPayload,
  ): Promise<ICoreServiceResponse<IAccount>> {
    const [error, account] = await to<
      ICoreServiceResponse<IAccount>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(AccountsPattern.UPDATE_ACCOUNT_BY_ID, {
          id,
          data: payload,
        }),
      ),
    );
    if (error) throw CoreHttpException.fromService(error);
    return account;
  }

  async deleteAccountById(id: string): Promise<ICoreServiceResponse<null>> {
    const [error, result] = await to<
      ICoreServiceResponse<null>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(AccountsPattern.DELETE_ACCOUNT_BY_ID, { id }),
      ),
    );
    if (error) throw CoreHttpException.fromService(error);
    return result;
  }
}
