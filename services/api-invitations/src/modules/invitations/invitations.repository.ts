import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@sv-connect/common';
import {
  ICreateInvitationPayload,
  IInvitation,
  IUpdateInvitationPayload,
} from '@sv-connect/domain';

@Injectable()
export class InvitationsRepository {
  private readonly defaultSelect: Prisma.InvitationSelect = {
    id: true,
    message: true,
    status: true,
    inviteeId: true,
    inviterId: true,
    createdAt: true,
    updatedAt: true,
    invitee: false,
    inviter: false,
  };

  constructor(private readonly prisma: PrismaService) {}

  async createInvitation(
    payload: ICreateInvitationPayload,
  ): Promise<IInvitation> {
    try {
      return (await this.prisma.invitation.create({
        data: {
          message: payload.message,
          status: payload.status,
          inviter: { connect: payload.inviter },
          invitee: { connect: payload.invitee },
        },
        select: this.defaultSelect,
      })) as IInvitation;
    } catch (e) {}
  }

  async updateInvitation(
    by: Prisma.InvitationWhereUniqueInput,
    payload: IUpdateInvitationPayload,
  ): Promise<IInvitation> {
    try {
      return (await this.prisma.invitation.update({
        where: { id: by.id },
        data: {
          message: payload.message,
          status: payload.status,
        },
        select: this.defaultSelect,
      })) as IInvitation;
    } catch (e) {}
  }
}
