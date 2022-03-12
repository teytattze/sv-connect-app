import { Injectable } from '@nestjs/common';
import { IAccount } from '@sv-connect/domain';
import { AdminAccountsRepository } from './accounts.admin.repository';

@Injectable()
export class AdminAccountsService {
  constructor(private readonly accountsRepository: AdminAccountsRepository) {}

  async adminGetAccountByEmail(email: string): Promise<IAccount> {
    return await this.accountsRepository.findAccount({ email });
  }
}
