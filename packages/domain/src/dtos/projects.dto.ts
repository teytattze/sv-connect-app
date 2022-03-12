import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import {
  ICreateProjectPayload,
  IUpdateProjectPayload,
} from '../payloads/projects.payload';
import { IProject } from '../interfaces/projects.interface';
import {
  ConnectFieldBody,
  ConnectSpecializationBody,
  ConnectStudentBody,
} from './connect.dto';
import { FieldDto } from './fields.dto';
import { SpecializationDto } from './specializations.dto';

export class ProjectDto implements IProject {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  summary: string;

  @ApiProperty()
  studentId: string;

  @ApiProperty({ type: FieldDto })
  field: FieldDto;

  @ApiProperty({ type: SpecializationDto })
  specializations: SpecializationDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class GetProjectByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class GetProjectByStudentIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}

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
  @ApiPropertyOptional({ type: ConnectFieldBody })
  field: ConnectFieldBody;

  @IsDefined()
  @ValidateNested()
  @Type(() => ConnectStudentBody)
  @ApiProperty({ type: ConnectStudentBody })
  student: ConnectStudentBody;

  @IsArray()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ConnectSpecializationBody)
  @ApiProperty({ isArray: true, type: ConnectSpecializationBody })
  specializations: ConnectSpecializationBody[];
}

export class UpdateProjectByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class UpdateProjectBody implements IUpdateProjectPayload {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  summary?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ConnectFieldBody)
  @ApiPropertyOptional({ type: ConnectFieldBody })
  field?: ConnectFieldBody;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ConnectSpecializationBody)
  @ApiPropertyOptional({ isArray: true, type: ConnectSpecializationBody })
  specializations?: ConnectSpecializationBody[];
}
