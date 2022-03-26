import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { UpdateManySpecializationsRelationBody } from '../../common/dtos';
import { IUpdateFieldPayload } from '../payloads/update-field.payload';

export class UpdateFieldBody implements IUpdateFieldPayload {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  title?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateManySpecializationsRelationBody)
  @ApiPropertyOptional({ type: UpdateManySpecializationsRelationBody })
  specializations?: UpdateManySpecializationsRelationBody;
}

export class UpdateFieldByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}
