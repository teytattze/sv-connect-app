import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@sv-connect/common';
import { IAccount } from '@sv-connect/domain';
import to from 'await-to-js';
import { handleRepositoryError } from './accounts.helper';

@Injectable()
export class AdminAccountsRepository {
  private readonly defaultSelect: Prisma.AccountSelect = {
    id: true,
    email: true,
    emailVerified: true,
    password: true,
    role: true,
    createdAt: true,
    updatedAt: true,
    session: false,
    supervisor: false,
    student: false,
    profile: false,
  };

  constructor(private readonly prisma: PrismaService) {}

  async findAccounts(): Promise<IAccount[]> {
    const [err, accounts] = await to(
      this.prisma.account.findMany({ select: this.defaultSelect }),
    );
    if (err) handleRepositoryError(err);
    return accounts as IAccount[];
  }

  async findAccount(by: Prisma.AccountWhereUniqueInput): Promise<IAccount> {
    const [err, account] = await to(
      this.prisma.account.findUnique({
        where: {
          id: by.id,
          email: by.email,
        },
        select: this.defaultSelect,
      }),
    );
    if (err) handleRepositoryError(err);
    return account as IAccount;
  }
}
