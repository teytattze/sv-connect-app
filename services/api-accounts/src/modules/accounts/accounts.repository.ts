import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@sv-connect/common';
import {
  IAccount,
  ICreateAccountPayload,
  IUpdateAccountPayload,
} from '@sv-connect/domain';

@Injectable()
export class AccountsRepository {
  private readonly defaultSelect: Prisma.AccountSelect = {
    id: true,
    email: true,
    emailVerified: true,
    password: false,
    role: true,
    createdAt: true,
    updatedAt: true,
    supervisor: false,
    student: false,
    profile: false,
  };

  constructor(private readonly prisma: PrismaService) {}

  async findAccounts(): Promise<IAccount[]> {
    return (await this.prisma.account.findMany({
      select: this.defaultSelect,
    })) as IAccount[];
  }

  async findAccount(by: Prisma.AccountWhereUniqueInput): Promise<IAccount> {
    return (await this.prisma.account.findUnique({
      where: {
        id: by.id,
        email: by.email,
      },
      select: this.defaultSelect,
    })) as IAccount;
  }

  async createAccount(payload: ICreateAccountPayload): Promise<IAccount> {
    return (await this.prisma.account.create({
      data: {
        email: payload.email,
        emailVerified: payload.emailVerified,
        password: payload.password,
        role: payload.role,
      },
      select: this.defaultSelect,
    })) as IAccount;
  }

  async updateAccount(
    by: Prisma.AccountWhereUniqueInput,
    payload: IUpdateAccountPayload,
  ): Promise<IAccount> {
    return (await this.prisma.account.update({
      where: {
        id: by.id,
        email: by.email,
      },
      data: {
        email: payload.email,
        emailVerified: payload.emailVerified,
        password: payload.password,
      },
      select: this.defaultSelect,
    })) as IAccount;
  }

  async deleteAccount(by: Prisma.AccountWhereUniqueInput): Promise<void> {
    await this.prisma.account.delete({
      where: {
        id: by.id,
        email: by.email,
      },
    });
  }
}
