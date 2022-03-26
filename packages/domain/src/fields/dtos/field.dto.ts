import { ApiProperty } from '@nestjs/swagger';
import { SpecializationEntity } from '../../specializations';
import { BaseDto } from '../../common/dtos';
import { IField } from '../interfaces/field.interface';

export class FieldDto extends BaseDto implements IField {
  @ApiProperty()
  title: string;

  @ApiProperty({ isArray: true, type: SpecializationEntity })
  specializations: SpecializationEntity[];
}
