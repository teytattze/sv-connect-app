import { ApiProperty } from '@nestjs/swagger';
import { Specialization } from '@prisma/client';
import { IsString } from 'class-validator';
import { BaseEntity } from '../../common/entity/base.entity';

export class SpecializationEntity extends BaseEntity implements Specialization {
  @IsString()
  @ApiProperty()
  title: string;
}
