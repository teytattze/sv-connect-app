import { Module } from '@nestjs/common';
import { AdminAccountsService } from './accounts.admin.service';

@Module({
  providers: [AdminAccountsService],
  exports: [AdminAccountsService],
})
export class AccountsModule {}
