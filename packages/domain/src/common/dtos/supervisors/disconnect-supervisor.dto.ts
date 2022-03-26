import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IDisconnectSupervisorPayload } from '../../payloads';

export class DisconnectSupervisorBody implements IDisconnectSupervisorPayload {
  @IsUUID()
  @ApiProperty()
  id: string;
}
