import { Injectable } from '@nestjs/common';
import {
  CoreApiException,
  IAccount,
  IAdminAccountsService,
  ICoreApiResponse,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { AdminAccountsRepository } from './accounts.admin.repository';

@Injectable()
export class AdminAccountsService implements IAdminAccountsService {
  constructor(private readonly accountsRepository: AdminAccountsRepository) {}

  async getAccountByEmail(email: string): Promise<IAccount> {
    const [error, account] = await to<IAccount, ICoreApiResponse>(
      this.accountsRepository.findAccount({
        email,
      }),
    );
    if (error) throw CoreApiException.new(error);
    return account;
  }
}
