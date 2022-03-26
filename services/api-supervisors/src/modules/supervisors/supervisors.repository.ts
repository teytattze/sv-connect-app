import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@sv-connect/common';
import {
  ICreateSupervisorPayload,
  ISupervisor,
  IUpdateSupervisorPayload,
} from '@sv-connect/domain';

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
    return (await this.prisma.supervisor.findMany({
      where: by,
      select: this.defaultSelect,
    })) as ISupervisor[];
  }

  async findSupervisor(
    by: Prisma.SupervisorWhereUniqueInput,
  ): Promise<ISupervisor> {
    return (await this.prisma.supervisor.findUnique({
      where: {
        id: by.id,
        accountId: by.accountId,
      },
      select: this.defaultSelect,
    })) as ISupervisor;
  }

  async createSupervisor(
    payload: ICreateSupervisorPayload,
  ): Promise<ISupervisor> {
    return (await this.prisma.supervisor.create({
      data: {
        capacity: payload.capacity,
        account: { connect: payload.account },
        field: { connect: payload.field },
        specializations: { connect: payload.specializations },
      },
      select: this.defaultSelect,
    })) as ISupervisor;
  }

  async updateSupervisor(
    by: Prisma.SupervisorWhereUniqueInput,
    payload: IUpdateSupervisorPayload,
  ): Promise<ISupervisor> {
    return (await this.prisma.supervisor.update({
      where: {
        id: by.id,
        accountId: by.accountId,
      },
      data: {
        capacity: payload.capacity,
        field: {
          connect: payload.field.connect,
          disconnect: payload.field.disconnect,
        },
        specializations: {
          connect: payload.specializations.connect,
          disconnect: payload.specializations.disconnect,
        },
      },
      select: this.defaultSelect,
    })) as ISupervisor;
  }

  async deleteSupervisor(by: Prisma.SupervisorWhereUniqueInput): Promise<void> {
    await this.prisma.supervisor.delete({
      where: {
        id: by.id,
        accountId: by.accountId,
      },
    });
  }
}
