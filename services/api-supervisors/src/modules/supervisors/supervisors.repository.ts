import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@sv-connect/common';
import {
  ICreateSupervisorPayload,
  ISupervisor,
  IUpdateSupervisorPayload,
} from '@sv-connect/domain';
import to from 'await-to-js';

@Injectable()
export class SupervisorsRepository {
  private readonly defaultSelect: Prisma.SupervisorSelect = {
    id: true,
    capacity: true,
    accountId: true,
    field: true,
    specializations: true,
    createdAt: true,
    updatedAt: true,
    account: false,
    fieldId: false,
    invitations: false,
    students: false,
  };

  constructor(private readonly prisma: PrismaService) {}

  async findSupervisors(
    by?: Prisma.SupervisorWhereInput,
  ): Promise<ISupervisor[]> {
    const [err, result] = await to(
      this.prisma.supervisor.findMany({
        where: by,
        select: this.defaultSelect,
      }),
    );
    return result as ISupervisor[];
  }

  async findSupervisor(
    by: Prisma.SupervisorWhereUniqueInput,
  ): Promise<ISupervisor> {
    const [err, result] = await to(
      this.prisma.supervisor.findUnique({
        where: {
          id: by.id,
          accountId: by.accountId,
        },
        select: this.defaultSelect,
      }),
    );
    return result as ISupervisor;
  }

  async createSupervisor(
    payload: ICreateSupervisorPayload,
  ): Promise<ISupervisor> {
    const [err, result] = await to(
      this.prisma.supervisor.create({
        data: {
          capacity: payload.capacity,
          account: { connect: payload.account },
          field: { connect: payload.field },
          specializations: { connect: payload.specializations },
        },
        select: this.defaultSelect,
      }),
    );
    return result as ISupervisor;
  }

  async updateSupervisor(
    by: Prisma.SupervisorWhereUniqueInput,
    payload: IUpdateSupervisorPayload,
  ): Promise<ISupervisor> {
    const [err, result] = await to(
      this.prisma.supervisor.update({
        where: {
          id: by.id,
          accountId: by.accountId,
        },
        data: {
          capacity: payload.capacity,
          field: { connect: payload.field },
          specializations: { connect: payload.specializations },
        },
        select: this.defaultSelect,
      }),
    );
    return result as ISupervisor;
  }
}
