import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccountsPattern } from '@sv-connect/common';
import {
  CoreServiceResponse,
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
  async indexAccounts(): Promise<CoreServiceResponse<IAccount[]>> {
    const accounts = await this.accountsService.indexAccounts();
    return CoreServiceResponse.success({ data: accounts });
  }

  @MessagePattern(AccountsPattern.CREATE_ACCOUNT)
  async createAccount(
    @Payload('data') data: ICreateAccountPayload,
  ): Promise<CoreServiceResponse<IAccount>> {
    const account = await this.accountsService.createAccount(data);
    return CoreServiceResponse.success({ data: account });
  }

  @MessagePattern(AccountsPattern.GET_ACCOUNT_BY_EMAIL)
  async getAccountByEmail(
    @Payload('email') email: string,
  ): Promise<CoreServiceResponse<IAccount>> {
    const account = await this.accountsService.getAccountByEmail(email);
    return CoreServiceResponse.success({ data: account });
  }

  @MessagePattern(AccountsPattern.GET_ACCOUNT_BY_ID)
  async getAccountById(
    @Payload('id') id: string,
  ): Promise<CoreServiceResponse<IAccount>> {
    const account = await this.accountsService.getAccountById(id);
    return CoreServiceResponse.success({ data: account });
  }

  @MessagePattern(AccountsPattern.UPDATE_ACCOUNT_BY_ID)
  async updateAccountById(
    @Payload('id') id: string,
    @Payload('data') payload: IUpdateAccountPayload,
  ): Promise<CoreServiceResponse<IAccount>> {
    const account = await this.accountsService.updateAccountById(id, payload);
    return CoreServiceResponse.success({ data: account });
  }

  @MessagePattern(AccountsPattern.DELETE_ACCOUNT_BY_ID)
  async deleteAccountById(
    @Payload('id') id: string,
  ): Promise<CoreServiceResponse<null>> {
    await this.accountsService.deleteAccountById(id);
    return CoreServiceResponse.success({
      message: 'Account deleted successfully',
    });
  }
}
