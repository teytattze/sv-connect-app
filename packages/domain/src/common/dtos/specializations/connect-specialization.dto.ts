import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { IConnectSpecializationPayload } from '../../payloads';

export class ConnectSpecializationBody
  implements IConnectSpecializationPayload
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
