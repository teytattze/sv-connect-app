import { Module } from '@nestjs/common';
import { SupervisorsController } from './supervisors.controller';
import { SupervisorsRepository } from './supervisors.repository';
import { SupervisorsService } from './supervisors.service';

@Module({
  controllers: [SupervisorsController],
  providers: [SupervisorsService, SupervisorsRepository],
})
export class SupervisorsModule {}
