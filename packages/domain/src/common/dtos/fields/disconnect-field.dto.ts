import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { IDisconnectFieldPayload } from '../../payloads';

export class DisconnectFieldBody implements IDisconnectFieldPayload {
  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional()
  id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  title?: string;
}
