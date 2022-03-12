import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';
import {
  IMatchSelectedStudentsAndSupervisorsPayload,
  IMatchSelectedStudentsPayload,
} from '../payloads';
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

export class MatchSelectedStudentsBody
  implements IMatchSelectedStudentsPayload
{
  @IsArray()
  @IsUUID()
  @ApiProperty()
  studentIds: string[];
}

export class MatchSelectedStudentsAndSupervisorsBody
  implements IMatchSelectedStudentsAndSupervisorsPayload
{
  @IsArray()
  @IsUUID()
  @ApiProperty()
  studentIds: string[];

  @IsArray()
  @IsUUID()
  @ApiProperty()
  supervisorIds: string[];
}
