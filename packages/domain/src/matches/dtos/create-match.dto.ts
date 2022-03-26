import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';
import {
  IMatchSelectedStudentsAndSupervisorsPayload,
  IMatchSelectedStudentsPayload,
  IMatchSingleStudentPayload,
} from '../payload/create-match.payload';

export class MatchSingleStudentBody implements IMatchSingleStudentPayload {
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
