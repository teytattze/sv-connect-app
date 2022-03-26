import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsUUID } from 'class-validator';
import { IDisconnectAccountPayload } from '../../payloads';

export class DisconnectAccountBody implements IDisconnectAccountPayload {
  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional()
  id?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  email?: string;
}
