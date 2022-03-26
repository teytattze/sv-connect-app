import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  ICreateSessionPayload,
  ISession,
  IUpdateSessionPayload,
} from '@sv-connect/domain';
import { PrismaService } from '@sv-connect/common';

@Injectable()
export class SessionsRepository {
  private readonly defaultSelect: Prisma.SessionSelect = {
    id: true,
    token: true,
    expiredAt: true,
    accountId: true,
    createdAt: true,
    updatedAt: true,
    account: false,
  };

  constructor(private readonly prisma: PrismaService) {}

  async findSession(by: Prisma.SessionWhereUniqueInput): Promise<ISession> {
    return (await this.prisma.session.findUnique({
      where: {
        id: by.id,
        accountId: by.accountId,
        token: by.token,
      },
      select: this.defaultSelect,
    })) as ISession;
  }

  async createSession(payload: ICreateSessionPayload): Promise<ISession> {
    return (await this.prisma.session.create({
      data: {
        account: {
          connect: payload.account,
        },
      },
      select: this.defaultSelect,
    })) as ISession;
  }

  async updateSession(
    by: Prisma.SessionWhereUniqueInput,
    payload: IUpdateSessionPayload,
  ): Promise<ISession> {
    return (await this.prisma.session.update({
      where: {
        id: by.id,
        accountId: by.accountId,
        token: by.token,
      },
      data: {
        token: payload.token,
        expiredAt: payload.expiredAt,
      },
      select: this.defaultSelect,
    })) as ISession;
  }
}
