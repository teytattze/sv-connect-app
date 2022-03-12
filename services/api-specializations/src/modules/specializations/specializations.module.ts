import { Module } from '@nestjs/common';
import { SpecializationsController } from './specializations.controller';
import { SpecializationsRepository } from './specializations.repository';
import { SpecializationsService } from './specializations.service';

@Module({
  controllers: [SpecializationsController],
  providers: [SpecializationsService, SpecializationsRepository],
})
export class SpecializationsModule {}
