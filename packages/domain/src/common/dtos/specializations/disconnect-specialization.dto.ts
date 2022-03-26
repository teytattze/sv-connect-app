import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { IDisconnectSpecializationPayload } from '../../payloads';

export class DisconnectSpecializationBody
  implements IDisconnectSpecializationPayload
{
  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional()
  id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  title?: string;
}
