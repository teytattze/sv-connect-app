import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccountsPattern } from '@sv-connect/common';
import {
  CoreApiResponse,
  IAccount,
  IAccountsClient,
  ICoreApiResponse,
  ICreateAccountPayload,
  IUpdateAccountPayload,
} from '@sv-connect/domain';
import { AccountsService } from './accounts.service';

@Controller()
export class AccountsController implements IAccountsClient {
  constructor(private readonly accountsService: AccountsService) {}

  @MessagePattern(AccountsPattern.INDEX_ACCOUNTS)
  async indexAccounts(): Promise<ICoreApiResponse<IAccount[]>> {
    const accounts = await this.accountsService.indexAccounts();
    return CoreApiResponse.success(accounts);
  }

  @MessagePattern(AccountsPattern.CREATE_ACCOUNT)
  async createAccount(
    @Payload('data') data: ICreateAccountPayload,
  ): Promise<ICoreApiResponse<IAccount>> {
    const account = await this.accountsService.createAccount(data);
    return CoreApiResponse.success(account);
  }

  @MessagePattern(AccountsPattern.GET_ACCOUNT_BY_EMAIL)
  async getAccountByEmail(
    @Payload('email') email: string,
  ): Promise<ICoreApiResponse<IAccount>> {
    const account = await this.accountsService.getAccountByEmail(email);
    return CoreApiResponse.success(account);
  }

  @MessagePattern(AccountsPattern.GET_ACCOUNT_BY_ID)
  async getAccountById(
    @Payload('id') id: string,
  ): Promise<ICoreApiResponse<IAccount>> {
    const account = await this.accountsService.getAccountById(id);
    return CoreApiResponse.success(account);
  }

  @MessagePattern(AccountsPattern.UPDATE_ACCOUNT_BY_ID)
  async updateAccountById(
    @Payload('id') id: string,
    @Payload('data') payload: IUpdateAccountPayload,
  ): Promise<ICoreApiResponse<IAccount>> {
    const account = await this.accountsService.updateAccountById(id, payload);
    return CoreApiResponse.success(account);
  }

  @MessagePattern(AccountsPattern.DELETE_ACCOUNT_BY_ID)
  async deleteAccountById(
    @Payload('id') id: string,
  ): Promise<ICoreApiResponse<null>> {
    await this.accountsService.deleteAccountById(id);
    return CoreApiResponse.success(null, 'Account deleted successfully');
  }
}
