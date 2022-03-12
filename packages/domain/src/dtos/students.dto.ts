import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { IStudent } from '../interfaces/students.interface';
import {
  ICreateStudentPayload,
  IUpdateStudentPayload,
} from '../payloads/students.payload';
import { ConnectAccountBody, ConnectSupervisorBody } from './connect.dto';

export class StudentDto implements IStudent {
  @ApiProperty()
  id: string;

  @ApiProperty()
  accountId: string;

  @ApiProperty()
  supervisorId: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class GetStudentByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class GetStudentByAccountIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class CreateStudentBody implements ICreateStudentPayload {
  @IsDefined()
  @ValidateNested()
  @Type(() => ConnectAccountBody)
  @ApiProperty({ type: ConnectAccountBody })
  account: ConnectAccountBody;

  @IsOptional()
  @ValidateNested()
  @Type(() => ConnectSupervisorBody)
  @ApiPropertyOptional({ type: ConnectSupervisorBody })
  supervisor?: ConnectSupervisorBody;
}

export class UpdateStudentByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class UpdateStudentByAccountIdParam {
  @IsUUID()
  @ApiProperty()
  accountId: string;
}

export class UpdateStudentBody implements IUpdateStudentPayload {
  @IsOptional()
  @ValidateNested()
  @Type(() => ConnectSupervisorBody)
  @ApiPropertyOptional({ type: ConnectSupervisorBody })
  supervisor?: ConnectSupervisorBody;
}
