import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { ConnectSupervisorBody } from './connect-supervisor.dto';
import { IUpdateOneSupervisorRelationPayload } from '../../payloads';

export class UpdateOneSupervisorRelationBody
  implements IUpdateOneSupervisorRelationPayload
{
  @IsOptional()
  @ValidateNested()
  @Type(() => ConnectSupervisorBody)
  @ApiPropertyOptional({ type: ConnectSupervisorBody })
  connect?: ConnectSupervisorBody;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  disconnect?: boolean;
}
