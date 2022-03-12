import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@sv-connect/common';
import {
  IAccount,
  ICreateAccountPayload,
  IUpdateAccountPayload,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { handleRepositoryError } from './accounts.helper';

@Injectable()
export class AccountsRepository {
  private readonly defaultSelect: Prisma.AccountSelect = {
    id: true,
    email: true,
    emailVerified: true,
    password: false,
    role: true,
    session: false,
    supervisor: false,
    student: false,
    profile: false,
    createdAt: true,
    updatedAt: true,
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

  async createAccount(payload: ICreateAccountPayload): Promise<IAccount> {
    const [err, account] = await to(
      this.prisma.account.create({
        data: {
          email: payload.email,
          emailVerified: payload.emailVerified,
          password: payload.password,
          role: payload.role,
        },
        select: this.defaultSelect,
      }),
    );
    if (err) handleRepositoryError(err);
    return account as IAccount;
  }

  async updateAccount(
    by: Prisma.AccountWhereUniqueInput,
    payload: IUpdateAccountPayload,
  ): Promise<IAccount> {
    const [err, account] = await to(
      this.prisma.account.update({
        where: {
          id: by.id,
          email: by.email,
        },
        data: {
          emailVerified: payload.emailVerified,
          password: payload.password,
        },
        select: this.defaultSelect,
      }),
    );
    if (err) handleRepositoryError(err);
    return account as IAccount;
  }

  async deleteAccount(by: Prisma.AccountWhereUniqueInput): Promise<void> {
    const [err] = await to(
      this.prisma.account.delete({
        where: {
          id: by.id,
          email: by.email,
        },
      }),
    );
    if (err) handleRepositoryError(err);
  }
}
