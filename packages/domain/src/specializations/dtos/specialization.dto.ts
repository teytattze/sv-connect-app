import { ApiProperty } from '@nestjs/swagger';
import { FieldEntity } from '../../fields';
import { BaseDto } from '../../common/dtos';
import { ISpecialization } from '../interfaces/specialization.interface';

export class SpecializationDto extends BaseDto implements ISpecialization {
  @ApiProperty()
  title: string;

  @ApiProperty({ isArray: true, type: FieldEntity })
  fields: FieldEntity[];
}
