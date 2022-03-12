import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  handleClientServiceError,
  AccountsPattern,
  ACCOUNTS_CLIENT,
} from '@sv-connect/common';
import {
  IAccount,
  IAccountsClient,
  IUpdateAccountPayload,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AccountsService implements IAccountsClient {
  constructor(@Inject(ACCOUNTS_CLIENT) private readonly client: ClientProxy) {}

  async updateAccountById(
    accountId: string,
    payload: IUpdateAccountPayload,
  ): Promise<IAccount> {
    const [err, result] = await to(
      firstValueFrom(
        this.client.send(AccountsPattern.UPDATE_ACCOUNT_BY_ID, {
          accountId,
          data: payload,
        }),
      ),
    );
    if (err) handleClientServiceError(err);
    return result;
  }
}
