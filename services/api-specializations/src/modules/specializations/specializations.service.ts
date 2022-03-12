import { Injectable } from '@nestjs/common';
import {
  ICreateSpecializationPayload,
  ISpecialization,
} from '@sv-connect/domain';
import { SpecializationsRepository } from './specializations.repository';

@Injectable()
export class SpecializationsService {
  constructor(
    private readonly specializationsRepository: SpecializationsRepository,
  ) {}

  async createSpecialization(
    payload: ICreateSpecializationPayload,
  ): Promise<ISpecialization> {
    return await this.specializationsRepository.createSpecialization(payload);
  }
}
