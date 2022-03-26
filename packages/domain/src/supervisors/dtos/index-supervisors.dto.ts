import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { IIndexSupervisorsByPayload } from '../payloads/index-supervisors.payload';

export class IndexSupervisorsQuery implements IIndexSupervisorsByPayload {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  fieldId?: string;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  maxCapacity?: number;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  minCapacity?: number;
}
