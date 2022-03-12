import { Module } from '@nestjs/common';
import { AdminAccountsController } from './accounts.admin.controller';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

@Module({
  controllers: [AccountsController, AdminAccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
