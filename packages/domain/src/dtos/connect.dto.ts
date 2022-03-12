import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import {
  IConnectAccountPayload,
  IConnectFieldPayload,
  IConnectInviteePayload,
  IConnectInviterPayload,
  IConnectSpecializationPayload,
  IConnectStudentPayload,
  IConnectSupervisorPayload,
} from '../payloads/connect.payload';

export class ConnectAccountBody implements IConnectAccountPayload {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class ConnectFieldBody implements IConnectFieldPayload {
  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional()
  id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  title?: string;
}

export class ConnectInviteeBody implements IConnectInviteePayload {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class ConnectInviterBody implements IConnectInviterPayload {
  @IsUUID()
  @ApiProperty()
  id: string;
}

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

export class ConnectStudentBody implements IConnectStudentPayload {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class ConnectSupervisorBody implements IConnectSupervisorPayload {
  @IsUUID()
  @ApiProperty()
  id: string;
}
