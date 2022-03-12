import { Module } from '@nestjs/common';
import { SupervisorsService } from './supervisors.service';

@Module({
  providers: [SupervisorsService],
  exports: [SupervisorsService],
})
export class SupervisorsModule {}
