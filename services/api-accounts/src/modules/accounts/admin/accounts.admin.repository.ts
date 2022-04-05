import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@sv-connect/common';
import { IAccount } from '@sv-connect/domain';

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
}
