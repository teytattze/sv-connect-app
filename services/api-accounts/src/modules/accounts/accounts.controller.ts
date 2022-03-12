import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccountsPattern } from '@sv-connect/common';
import {
  IAccount,
  IAccountsClient,
  ICreateAccountPayload,
  IUpdateAccountPayload,
} from '@sv-connect/domain';
import { AccountsService } from './accounts.service';

@Controller()
export class AccountsController implements IAccountsClient {
  constructor(private readonly accountsService: AccountsService) {}

  @MessagePattern(AccountsPattern.INDEX_ACCOUNTS)
  async indexAccounts(): Promise<IAccount[]> {
    return await this.accountsService.indexAccounts();
  }

  @MessagePattern(AccountsPattern.CREATE_ACCOUNT)
  async registerAccount(
    @Payload('data') data: ICreateAccountPayload,
  ): Promise<IAccount> {
    return await this.accountsService.registerAccount(data);
  }

  @MessagePattern(AccountsPattern.GET_ACCOUNT_BY_EMAIL)
  async getAccountByEmail(@Payload('email') email: string): Promise<IAccount> {
    return await this.accountsService.getAccountByEmail(email);
  }

  @MessagePattern(AccountsPattern.GET_ACCOUNT_BY_ID)
  async getAccountById(@Payload('id') id: string): Promise<IAccount> {
    return await this.accountsService.getAccountById(id);
  }

  @MessagePattern(AccountsPattern.UPDATE_ACCOUNT_BY_ID)
  async updateAccountById(
    @Payload('id') id: string,
    @Payload('data') payload: IUpdateAccountPayload,
  ): Promise<IAccount> {
    return await this.accountsService.updateAccountById(id, payload);
  }

  @MessagePattern(AccountsPattern.DELETE_ACCOUNT_BY_ID)
  async deleteAccountById(@Payload('id') id: string) {
    await this.accountsService.deleteAccountById(id);
  }
}
