import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  handleClientServiceError,
  ACCOUNTS_CLIENT,
  AccountsPattern,
} from '@sv-connect/common';
import { IAccount, IAdminAccountsClient } from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AccountsService implements IAdminAccountsClient {
  constructor(@Inject(ACCOUNTS_CLIENT) private readonly client: ClientProxy) {}

  async adminGetAccountByEmail(email: string): Promise<IAccount> {
    const [err, result] = await to(
      firstValueFrom(
        this.client.send(AccountsPattern.ADMIN_GET_ACCOUNT_BY_EMAIL, { email }),
      ),
    );
    if (err) handleClientServiceError(err);
    return result;
  }
}
