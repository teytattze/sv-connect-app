import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SpecializationsPattern } from '@sv-connect/common';
import {
  ICreateSpecializationPayload,
  ISpecializationsClient,
  ISpecialization,
} from '@sv-connect/domain';
import { SpecializationsService } from './specializations.service';

@Controller()
export class SpecializationsController implements ISpecializationsClient {
  constructor(
    private readonly specializationsService: SpecializationsService,
  ) {}

  @MessagePattern(SpecializationsPattern.CREATE_SPECIALIZATION)
  async createSpecialization(
    @Payload('data') payload: ICreateSpecializationPayload,
  ): Promise<ISpecialization> {
    return await this.specializationsService.createSpecialization(payload);
  }
}
