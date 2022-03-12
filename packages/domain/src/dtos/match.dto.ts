import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IMatch, IStudentWithProject, ISupervisor } from '../interfaces';

export class MatchDto implements IMatch {
  @ApiProperty()
  isConfirm: boolean;

  @ApiProperty()
  isMatched: boolean;

  @ApiProperty()
  student: IStudentWithProject;

  @ApiProperty()
  supervisor: ISupervisor;
}

export class MatchSingleStudentParam {
  @IsUUID()
  @ApiProperty()
  studentId: string;
}
