import { Module } from '@nestjs/common';
import { FieldsController } from './fields.controller';
import { FieldsRepository } from './fields.repository';
import { FieldsService } from './fields.service';

@Module({
  controllers: [FieldsController],
  providers: [FieldsService, FieldsRepository],
})
export class FieldsModule {}
