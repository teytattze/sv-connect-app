import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SpecializationsPattern } from '@sv-connect/common';
import {
  ICreateSpecializationPayload,
  ISpecializationsClient,
  ISpecialization,
  IUpdateSpecializationPayload,
  ICoreApiResponse,
  CoreApiResponse,
} from '@sv-connect/domain';
import { SpecializationsService } from './specializations.service';

@Controller()
export class SpecializationsController implements ISpecializationsClient {
  constructor(
    private readonly specializationsService: SpecializationsService,
  ) {}

  @MessagePattern(SpecializationsPattern.INDEX_SPECIALIZATIONS)
  async indexSpecializations(): Promise<ICoreApiResponse<ISpecialization[]>> {
    const specializations =
      await this.specializationsService.indexSpecializations();
    return CoreApiResponse.success(specializations);
  }

  @MessagePattern(SpecializationsPattern.GET_SPECIALIZATION_BY_ID)
  async getSpecializationById(
    @Payload('id') id: string,
  ): Promise<ICoreApiResponse<ISpecialization>> {
    const specialization =
      await this.specializationsService.getSpecializationById(id);
    return CoreApiResponse.success(specialization);
  }

  @MessagePattern(SpecializationsPattern.CREATE_SPECIALIZATION)
  async createSpecialization(
    @Payload('data') payload: ICreateSpecializationPayload,
  ): Promise<ICoreApiResponse<ISpecialization>> {
    const specialization =
      await this.specializationsService.createSpecialization(payload);
    return CoreApiResponse.success(specialization);
  }

  @MessagePattern(SpecializationsPattern.UPDATE_SPECIALIZATION_BY_ID)
  async updateSpecializationById(
    @Payload('id') id: string,
    @Payload('data') payload: IUpdateSpecializationPayload,
  ): Promise<ICoreApiResponse<ISpecialization>> {
    const specialization =
      await this.specializationsService.updateSpecializationById(id, payload);
    return CoreApiResponse.success(specialization);
  }

  @MessagePattern(SpecializationsPattern.DELETE_SPECIALIZATION_BY_ID)
  async deleteSpecializationById(
    @Payload('id') id: string,
  ): Promise<ICoreApiResponse<null>> {
    await this.specializationsService.deleteSpecializationById(id);
    return CoreApiResponse.success(null, 'Specialization deleted successfully');
  }
}
