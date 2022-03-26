import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsUUID } from 'class-validator';
import { IConnectAccountPayload } from '../../payloads';

export class ConnectAccountBody implements IConnectAccountPayload {
  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional()
  id?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  email?: string;
}
