import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  IAccount,
  ICreateAccountPayload,
  IUpdateAccountPayload,
} from '@sv-connect/domain';
import { ServiceError } from '@sv-connect/domain/errors';
import * as bcrypt from 'bcryptjs';
import { AccountsRepository } from './accounts.repository';
import { SessionsService } from '../sessions/sessions.service';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly sessionsService: SessionsService,
  ) {}

  async indexAccounts(): Promise<IAccount[]> {
    return await this.accountsRepository.findAccounts();
  }

  async getAccountById(id: string): Promise<IAccount> {
    return await this.accountsRepository.findAccount({ id });
  }

  async getAccountByEmail(email: string): Promise<IAccount> {
    return await this.accountsRepository.findAccount({ email });
  }

  async registerAccount(payload: ICreateAccountPayload): Promise<IAccount> {
    const isExisted = await this.isAccountExistsByEmail(payload.email);
    if (isExisted) throw new RpcException(ServiceError.ACCOUNT_EMAIL_EXISTS);

    const hashedPassword = await this.hashPassword(payload.password);
    const newAccount = await this.accountsRepository.createAccount({
      ...payload,
      password: hashedPassword,
    });

    await this.sessionsService.createSession({
      account: { id: newAccount.id },
    });
    return newAccount;
  }

  async updateAccountById(
    id: string,
    payload: IUpdateAccountPayload,
  ): Promise<IAccount> {
    return await this.accountsRepository.updateAccount({ id }, payload);
  }

  async deleteAccountById(id: string): Promise<void> {
    await this.accountsRepository.deleteAccount({ id });
  }

  async isAccountExistsByEmail(email: string): Promise<boolean> {
    return !!(await this.accountsRepository.findAccount({ email }));
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
