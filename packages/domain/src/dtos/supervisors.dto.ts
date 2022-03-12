import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ISupervisor } from '../interfaces/supervisors.interface';
import {
  ICreateSupervisorPayload,
  IIndexSupervisorsByPayload,
  IUpdateSupervisorPayload,
} from '../payloads/supervisors.payload';
import {
  ConnectAccountBody,
  ConnectFieldBody,
  ConnectSpecializationBody,
} from './connect.dto';
import { FieldDto } from './fields.dto';
import { SpecializationDto } from './specializations.dto';

export class SupervisorDto implements ISupervisor {
  @ApiProperty()
  id: string;

  @ApiProperty()
  capacity: number;

  @ApiProperty()
  accountId: string;

  @ApiProperty({ type: FieldDto })
  field: FieldDto;

  @ApiProperty({ isArray: true, type: SpecializationDto })
  specializations: SpecializationDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class IndexSupervisorsQuery implements IIndexSupervisorsByPayload {
  @IsOptional()
  @IsString()
  @ApiProperty()
  fieldId?: string;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  maxCapacity?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  minCapacity?: number;
}

export class GetSupervisorByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class GetSupervisorByAccountIdParam {
  @IsUUID()
  @ApiProperty()
  accountId: string;
}

export class CreateSupervisorBody implements ICreateSupervisorPayload {
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  capacity?: number;

  @IsDefined()
  @ValidateNested()
  @Type(() => ConnectAccountBody)
  @ApiProperty({ type: ConnectAccountBody })
  account: ConnectAccountBody;

  @IsDefined()
  @ValidateNested()
  @Type(() => ConnectFieldBody)
  @ApiPropertyOptional({ type: ConnectFieldBody })
  field: ConnectFieldBody;

  @IsArray()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ConnectSpecializationBody)
  @ApiProperty({ isArray: true, type: ConnectSpecializationBody })
  specializations: ConnectSpecializationBody[];
}

export class UpdateSupervisorByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class UpdateSupervisorByAccountIdParam {
  @IsUUID()
  @ApiProperty()
  accountId: string;
}

export class UpdateSupervisorBody implements IUpdateSupervisorPayload {
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  capacity?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => ConnectAccountBody)
  @ApiPropertyOptional({ type: ConnectAccountBody })
  account: ConnectAccountBody;

  @IsOptional()
  @ValidateNested()
  @Type(() => ConnectFieldBody)
  @ApiPropertyOptional({ type: ConnectFieldBody })
  field: ConnectFieldBody;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ConnectSpecializationBody)
  @ApiPropertyOptional({ isArray: true, type: ConnectSpecializationBody })
  specializations: ConnectSpecializationBody[];
}
