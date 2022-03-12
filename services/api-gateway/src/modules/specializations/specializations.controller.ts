import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateSpecializationBody,
  SpecializationDto,
} from '@sv-connect/domain';
import { SpecializationsService } from './specializations.service';

@Controller('specializations')
export class SpecializationsController {
  constructor(
    private readonly specializationsService: SpecializationsService,
  ) {}

  @Post('create')
  async createSpecialization(
    @Body() body: CreateSpecializationBody,
  ): Promise<SpecializationDto> {
    return await this.specializationsService.createSpecialization(body);
  }
}
