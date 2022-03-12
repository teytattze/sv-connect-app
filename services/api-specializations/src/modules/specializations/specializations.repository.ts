import { Injectable } from '@nestjs/common';
import {
  ICreateSpecializationPayload,
  ISpecialization,
} from '@sv-connect/domain';
import { PrismaService } from '@sv-connect/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class SpecializationsRepository {
  private readonly defaultSelect: Prisma.SpecializationSelect = {
    id: true,
    title: true,
    field: true,
    updatedAt: true,
    createdAt: true,
    fieldId: false,
    projects: false,
    supervisors: false,
  };

  constructor(private readonly prisma: PrismaService) {}

  async createSpecialization(
    payload: ICreateSpecializationPayload,
  ): Promise<ISpecialization> {
    try {
      return (await this.prisma.specialization.create({
        data: {
          title: payload.title,
          field: {
            connect: payload.field,
          },
        },
        select: this.defaultSelect,
      })) as ISpecialization;
    } catch (err) {}
  }
}
