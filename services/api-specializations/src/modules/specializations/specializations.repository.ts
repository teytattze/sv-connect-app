import { Injectable } from '@nestjs/common';
import {
  ICreateSpecializationPayload,
  ISpecialization,
  IUpdateSpecializationPayload,
} from '@sv-connect/domain';
import { PrismaService } from '@sv-connect/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class SpecializationsRepository {
  private readonly defaultSelect: Prisma.SpecializationSelect = {
    id: true,
    title: true,
    fields: true,
    updatedAt: true,
    createdAt: true,
    projects: false,
    supervisors: false,
  };

  constructor(private readonly prisma: PrismaService) {}

  async findSpecializations(): Promise<ISpecialization[]> {
    return (await this.prisma.specialization.findMany({
      select: this.defaultSelect,
    })) as ISpecialization[];
  }

  async findSpecialization(
    by: Prisma.SpecializationWhereUniqueInput,
  ): Promise<ISpecialization> {
    return (await this.prisma.specialization.findUnique({
      where: { id: by.id, title: by.title },
      select: this.defaultSelect,
    })) as ISpecialization;
  }

  async createSpecialization(
    payload: ICreateSpecializationPayload,
  ): Promise<ISpecialization> {
    return (await this.prisma.specialization.create({
      data: {
        title: payload.title,
        fields: { connect: payload.fields },
      },
      select: this.defaultSelect,
    })) as ISpecialization;
  }

  async updateSpecialization(
    by: Prisma.SpecializationWhereUniqueInput,
    payload: IUpdateSpecializationPayload,
  ): Promise<ISpecialization> {
    return (await this.prisma.specialization.update({
      where: { id: by.id, title: by.title },
      data: {
        title: payload.title,
        fields: {
          connect: payload.fields?.connect,
          disconnect: payload.fields?.disconnect,
        },
      },
      select: this.defaultSelect,
    })) as ISpecialization;
  }

  async deleteSpecialization(
    by: Prisma.SpecializationWhereUniqueInput,
  ): Promise<void> {
    await this.prisma.specialization.delete({
      where: { id: by.id, title: by.title },
      select: this.defaultSelect,
    });
  }
}
