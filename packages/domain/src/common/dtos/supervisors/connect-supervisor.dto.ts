import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IConnectSupervisorPayload } from '../../payloads';

export class ConnectSupervisorBody implements IConnectSupervisorPayload {
  @IsUUID()
  @ApiProperty()
  id: string;
}
