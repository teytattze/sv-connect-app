import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ACCOUNTS_CLIENT, AccountsPattern } from '@sv-connect/common';
import {
  CoreRpcException,
  IAccount,
  IAdminAccountsClient,
  ICoreServiceResponse,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AdminAccountsService implements IAdminAccountsClient {
  constructor(@Inject(ACCOUNTS_CLIENT) private readonly client: ClientProxy) {}

  async getAccountByEmail(
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
    if (error) throw CoreRpcException.fromService(error);
    return account;
  }
}
