import { ApiProperty } from '@nestjs/swagger';
import { Field } from '@prisma/client';
import { IsString } from 'class-validator';
import { BaseEntity } from '../../common/entity/base.entity';

export class FieldEntity extends BaseEntity implements Field {
  @IsString()
  @ApiProperty()
  title: string;
}
