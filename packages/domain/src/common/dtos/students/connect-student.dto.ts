import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IConnectStudentPayload } from '../../payloads';

export class ConnectStudentBody implements IConnectStudentPayload {
  @IsUUID()
  @ApiProperty()
  id: string;
}
