import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccountsPattern } from '@sv-connect/common';
import { IAccount, IAdminAccountsClient } from '@sv-connect/domain';
import { AdminAccountsService } from './accounts.admin.service';

@Controller()
export class AccountsAdminController implements IAdminAccountsClient {
  constructor(private readonly accountsService: AdminAccountsService) {}

  @MessagePattern(AccountsPattern.ADMIN_GET_ACCOUNT_BY_EMAIL)
  async adminGetAccountByEmail(
    @Payload('email') email: string,
  ): Promise<IAccount> {
    return await this.accountsService.adminGetAccountByEmail(email);
  }
}
