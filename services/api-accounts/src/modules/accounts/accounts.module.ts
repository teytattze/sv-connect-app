import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './accounts.repository';
import { AccountsAdminController } from './accounts.admin.controller';
import { SessionsModule } from '../sessions/sessions.module';
import { AdminAccountsService } from './accounts.admin.service';
import { AdminAccountsRepository } from './accounts.admin.repository';

@Module({
  imports: [SessionsModule],
  controllers: [AccountsAdminController, AccountsController],
  providers: [
    AdminAccountsService,
    AdminAccountsRepository,
    AccountsService,
    AccountsRepository,
  ],
})
export class AccountsModule {}
