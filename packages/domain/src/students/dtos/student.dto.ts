import { ApiProperty } from '@nestjs/swagger';
import { Nullable } from '../../common/types';
import { ProjectDto } from '../../projects';
import { BaseDto } from '../../common/dtos';
import { IStudent } from '../interfaces/student.interface';

export class StudentDto extends BaseDto implements IStudent {
  @ApiProperty()
  accountId: string;

  @ApiProperty()
  supervisorId: string;
}

export class StudentWithProjectDto extends StudentDto {
  @ApiProperty({ type: ProjectDto })
  project: Nullable<ProjectDto>;
}
