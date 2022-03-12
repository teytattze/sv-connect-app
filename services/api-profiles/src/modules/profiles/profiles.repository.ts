import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@sv-connect/common';
import {
  ICreateProfilePayload,
  IProfile,
  IUpdateProfilePayload,
} from '@sv-connect/domain';

@Injectable()
export class ProfilesRepository {
  private readonly defaultSelect: Prisma.ProfileSelect = {
    id: true,
    firstName: true,
    lastName: true,
    headline: true,
    summary: true,
    pictureUrl: true,
    backgroundUrl: true,
    accountId: true,
    createdAt: true,
    updatedAt: true,
    account: false,
  };

  constructor(private readonly prisma: PrismaService) {}

  async findProfile(by: Prisma.ProfileWhereUniqueInput): Promise<IProfile> {
    try {
      return (await this.prisma.profile.findUnique({
        where: { id: by.id, accountId: by.accountId },
        select: this.defaultSelect,
      })) as IProfile;
    } catch (err) {}
  }

  async createProfile(payload: ICreateProfilePayload): Promise<IProfile> {
    try {
      return (await this.prisma.profile.create({
        data: {
          firstName: payload.firstName,
          lastName: payload.lastName,
          headline: payload.headline,
          summary: payload.summary,
          pictureUrl: payload.pictureUrl,
          backgroundUrl: payload.backgroundUrl,
          account: { connect: payload.account },
        },
        select: this.defaultSelect,
      })) as IProfile;
    } catch (err) {}
  }

  async updateProfile(
    by: Prisma.ProfileWhereUniqueInput,
    payload: IUpdateProfilePayload,
  ): Promise<IProfile> {
    try {
      return (await this.prisma.profile.update({
        where: { id: by.id, accountId: by.accountId },
        data: {
          firstName: payload.firstName,
          lastName: payload.lastName,
          headline: payload.headline,
          summary: payload.summary,
          pictureUrl: payload.pictureUrl,
          backgroundUrl: payload.backgroundUrl,
        },
        select: this.defaultSelect,
      })) as IProfile;
    } catch (err) {}
  }
}
