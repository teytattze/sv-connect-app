import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDefined, IsString, ValidateNested } from 'class-validator';
import {
  ConnectFieldBody,
  ConnectSpecializationBody,
  ConnectStudentBody,
} from '../../common/dtos';
import { ICreateProjectPayload } from '../payloads/create-project.payload';

export class CreateProjectBody implements ICreateProjectPayload {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  summary: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => ConnectFieldBody)
  @ApiProperty({ type: ConnectFieldBody })
  field: ConnectFieldBody;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectSpecializationBody)
  @ApiProperty({ isArray: true, type: ConnectSpecializationBody })
  specializations: ConnectSpecializationBody[];

  @IsDefined()
  @ValidateNested()
  @Type(() => ConnectStudentBody)
  @ApiProperty({ type: ConnectStudentBody })
  student: ConnectStudentBody;
}
