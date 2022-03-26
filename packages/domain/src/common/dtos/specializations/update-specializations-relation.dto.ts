import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { ConnectSpecializationBody } from './connect-specialization.dto';
import { DisconnectSpecializationBody } from './disconnect-specialization.dto';
import { IUpdateManySpecializationsRelationPayload } from '../../payloads';

export class UpdateManySpecializationsRelationBody
  implements IUpdateManySpecializationsRelationPayload
{
  @IsOptional()
  @ValidateNested()
  @Type(() => ConnectSpecializationBody)
  @ApiPropertyOptional({ isArray: true, type: ConnectSpecializationBody })
  connect?: ConnectSpecializationBody[];

  @IsOptional()
  @ValidateNested()
  @Type(() => DisconnectSpecializationBody)
  @ApiPropertyOptional({ isArray: true, type: DisconnectSpecializationBody })
  disconnect?: DisconnectSpecializationBody[];
}
