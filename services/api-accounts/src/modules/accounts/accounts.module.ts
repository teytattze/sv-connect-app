import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './accounts.repository';
import { AccountsAdminController } from './admin/accounts.admin.controller';
import { AdminAccountsService } from './admin/accounts.admin.service';
import { AdminAccountsRepository } from './admin/accounts.admin.repository';

@Module({
  controllers: [AccountsAdminController, AccountsController],
  providers: [
    AdminAccountsService,
    AdminAccountsRepository,
    AccountsService,
    AccountsRepository,
  ],
})
export class AccountsModule {}
