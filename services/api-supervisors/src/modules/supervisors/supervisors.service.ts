import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  ICreateSupervisorPayload,
  IIndexSupervisorsByPayload,
  ISupervisor,
  IUpdateSupervisorPayload,
} from '@sv-connect/domain';
import { SupervisorsRepository } from './supervisors.repository';

@Injectable()
export class SupervisorsService {
  constructor(private readonly supervisorsRepository: SupervisorsRepository) {}

  async indexSupervisors(
    by?: IIndexSupervisorsByPayload,
  ): Promise<ISupervisor[]> {
    const where = this.mapFilterToPrismaWhere(by);
    return await this.supervisorsRepository.findSupervisors(where);
  }

  async getSupervisorById(id: string): Promise<ISupervisor> {
    return await this.supervisorsRepository.findSupervisor({ id });
  }

  async getSupervisorByAccountId(accountId: string): Promise<ISupervisor> {
    return await this.supervisorsRepository.findSupervisor({ accountId });
  }

  async createSupervisor(
    payload: ICreateSupervisorPayload,
  ): Promise<ISupervisor> {
    return await this.supervisorsRepository.createSupervisor(payload);
  }

  async updateSupervisorByAccountId(
    accountId: string,
    payload: IUpdateSupervisorPayload,
  ): Promise<ISupervisor> {
    return await this.supervisorsRepository.updateSupervisor(
      { accountId },
      payload,
    );
  }

  private mapFilterToPrismaWhere(
    by?: IIndexSupervisorsByPayload,
  ): Prisma.SupervisorWhereInput {
    const result: Prisma.SupervisorWhereInput = {
      capacity: {},
      fieldId: {},
      specializations: {},
    };

    if (by?.maxCapacity) {
      result.capacity = {
        ...(result.capacity as Prisma.IntFilter),
        lte: by.maxCapacity,
      };
    }
    if (by?.minCapacity) {
      result.capacity = {
        ...(result.capacity as Prisma.IntFilter),
        gte: by.minCapacity,
      };
    }
    if (by?.fieldId) {
      result.fieldId = {
        ...(result.fieldId as Prisma.StringFilter),
        equals: by.fieldId,
      };
    }
    return result;
  }
}
