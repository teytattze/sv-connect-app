import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { UpdateManyFieldsRelationBody } from '../../common/dtos';
import { IUpdateSpecializationPayload } from '../payloads/update-specialization.payload';

export class UpdateSpecializationBody implements IUpdateSpecializationPayload {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  title?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateManyFieldsRelationBody)
  @ApiPropertyOptional({ type: UpdateManyFieldsRelationBody })
  fields?: UpdateManyFieldsRelationBody;
}

export class UpdateSpecializationByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}
