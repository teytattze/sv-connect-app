import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccountsPattern } from '@sv-connect/common';
import {
  CoreApiResponse,
  IAccount,
  IAccountsClient,
  ICoreApiResponse,
} from '@sv-connect/domain';
import { AdminAccountsService } from './accounts.admin.service';

@Controller()
export class AccountsAdminController implements IAccountsClient {
  constructor(private readonly accountsService: AdminAccountsService) {}

  @MessagePattern(AccountsPattern.ADMIN_GET_ACCOUNT_BY_EMAIL)
  async getAccountByEmail(
    @Payload('email') email: string,
  ): Promise<ICoreApiResponse<IAccount>> {
    const account = await this.accountsService.getAccountByEmail(email);
    return CoreApiResponse.success(account);
  }
}
