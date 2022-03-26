import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import {
  UpdateManySpecializationsRelationBody,
  UpdateOneFieldRelationBody,
} from '../../common/dtos';
import { IUpdateSupervisorPayload } from '../payloads/update-supervisor.payload';

export class UpdateSupervisorBody implements IUpdateSupervisorPayload {
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  capacity?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateOneFieldRelationBody)
  @ApiPropertyOptional({ type: UpdateOneFieldRelationBody })
  field?: UpdateOneFieldRelationBody;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateManySpecializationsRelationBody)
  @ApiPropertyOptional({ type: UpdateManySpecializationsRelationBody })
  specializations?: UpdateManySpecializationsRelationBody;
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
