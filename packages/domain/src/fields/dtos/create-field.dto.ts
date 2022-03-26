import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ConnectSpecializationBody } from '../../common/dtos';
import { ICreateFieldPayload } from '../payloads/create-field.payload';

export class CreateFieldBody implements ICreateFieldPayload {
  @IsString()
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectSpecializationBody)
  @ApiPropertyOptional({ isArray: true, type: ConnectSpecializationBody })
  specializations?: ConnectSpecializationBody[];
}
