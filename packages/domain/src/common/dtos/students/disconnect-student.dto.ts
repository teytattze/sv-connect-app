import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IDisconnectStudentPayload } from '../../payloads';

export class DisconnectStudentBody implements IDisconnectStudentPayload {
  @IsUUID()
  @ApiProperty()
  id: string;
}
