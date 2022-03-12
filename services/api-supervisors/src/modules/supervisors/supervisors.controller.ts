import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SupervisorsPattern } from '@sv-connect/common';
import {
  ICreateSupervisorPayload,
  IIndexSupervisorsByPayload,
  ISupervisor,
  IUpdateSupervisorPayload,
} from '@sv-connect/domain';
import { SupervisorsService } from './supervisors.service';

@Controller()
export class SupervisorsController {
  constructor(private readonly supervisorsService: SupervisorsService) {}

  @MessagePattern(SupervisorsPattern.INDEX_SUPERVISORS)
  async indexSupervisors(
    @Payload('by') by: IIndexSupervisorsByPayload,
  ): Promise<ISupervisor[]> {
    return await this.supervisorsService.indexSupervisors(by);
  }

  @MessagePattern(SupervisorsPattern.GET_SUPERVISOR_BY_ID)
  async getSupervisorById(@Payload('id') id: string): Promise<ISupervisor> {
    return await this.supervisorsService.getSupervisorById(id);
  }

  @MessagePattern(SupervisorsPattern.GET_SUPERVISOR_BY_ACCOUNT_ID)
  async getSupervisorByAccountId(
    @Payload('accountId') accountId: string,
  ): Promise<ISupervisor> {
    return await this.supervisorsService.getSupervisorByAccountId(accountId);
  }

  @MessagePattern(SupervisorsPattern.CREATE_SUPERVISOR)
  async createSupervisor(
    @Payload('data') payload: ICreateSupervisorPayload,
  ): Promise<ISupervisor> {
    return await this.supervisorsService.createSupervisor(payload);
  }

  @MessagePattern(SupervisorsPattern.UPDATE_SUPERVISOR_BY_ACCOUNT_ID)
  async updateSupervisorByAccountId(
    @Payload('accountId') accountId: string,
    @Payload('data') payload: IUpdateSupervisorPayload,
  ): Promise<ISupervisor> {
    return await this.supervisorsService.updateSupervisorByAccountId(
      accountId,
      payload,
    );
  }
}
