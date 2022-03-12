import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  ICreateSessionPayload,
  ISession,
  IUpdateSessionPayload,
} from '@sv-connect/domain';
import { PrismaService } from '@sv-connect/common';
import to from 'await-to-js';
import { handleRepositoryError } from './sessions.helper';

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
    const [err, session] = await to(
      this.prisma.session.findUnique({
        where: { id: by.id, accountId: by.accountId, token: by.token },
        select: this.defaultSelect,
      }),
    );
    if (err) handleRepositoryError(err);
    return session as ISession;
  }

  async createSession(payload: ICreateSessionPayload): Promise<ISession> {
    const [err, session] = await to(
      this.prisma.session.create({
        data: {
          account: {
            connect: payload.account,
          },
        },
        select: this.defaultSelect,
      }),
    );
    if (err) handleRepositoryError(err);
    return session as ISession;
  }

  async updateSession(
    by: Prisma.SessionWhereUniqueInput,
    payload: IUpdateSessionPayload,
  ) {
    const [err, session] = await to(
      this.prisma.session.update({
        where: { id: by.id, accountId: by.accountId, token: by.token },
        data: {
          token: payload.token,
          expiredAt: payload.expiredAt,
        },
        select: this.defaultSelect,
      }),
    );
    if (err) handleRepositoryError(err);
    return session as ISession;
  }
}
