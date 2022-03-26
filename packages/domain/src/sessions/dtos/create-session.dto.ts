import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { ConnectStudentBody } from '../../common/dtos';
import { ICreateSessionPayload } from '../payloads/create-session.payload';

export class CreateSessionBody implements ICreateSessionPayload {
  @IsDefined()
  @ValidateNested()
  @Type(() => ConnectStudentBody)
  @ApiProperty({ type: ConnectStudentBody })
  account: ConnectStudentBody;
}
