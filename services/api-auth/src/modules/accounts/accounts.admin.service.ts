import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ACCOUNTS_CLIENT, AccountsPattern } from '@sv-connect/common';
import {
  CoreApiException,
  IAccount,
  IAdminAccountsClient,
  ICoreApiResponse,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AdminAccountsService implements IAdminAccountsClient {
  constructor(@Inject(ACCOUNTS_CLIENT) private readonly client: ClientProxy) {}

  async getAccountByEmail(email: string): Promise<ICoreApiResponse<IAccount>> {
    const [error, account] = await to<
      ICoreApiResponse<IAccount>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.client.send(AccountsPattern.ADMIN_GET_ACCOUNT_BY_EMAIL, { email }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return account;
  }
}
