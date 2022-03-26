import { FieldEntity } from '../../fields';
import { SpecializationEntity } from '../../specializations';
import { BaseDto } from '../../common/dtos';
import { IProject } from '../interfaces/project.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Nullable } from '../../common/types/common.type';

export class ProjectDto extends BaseDto implements IProject {
  @ApiProperty()
  title: string;

  @ApiProperty()
  summary: string;

  @ApiProperty()
  studentId: string;

  @ApiProperty({ type: FieldEntity })
  field: Nullable<FieldEntity>;

  @ApiProperty({ isArray: true, type: SpecializationEntity })
  specializations: SpecializationEntity[];
}
