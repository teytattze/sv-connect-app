import { ApiProperty } from '@nestjs/swagger';
import { FieldEntity } from '../../fields';
import { BaseDto } from '../../common/dtos';
import { SpecializationEntity } from '../../specializations';
import { ISupervisor } from '../interfaces/supervisor.interface';

export class SupervisorDto extends BaseDto implements ISupervisor {
  @ApiProperty()
  capacity: number;

  @ApiProperty()
  accountId: string;

  @ApiProperty()
  field: FieldEntity;

  @ApiProperty()
  specializations: SpecializationEntity[];
}
