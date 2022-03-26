import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsOptional, ValidateNested } from 'class-validator';
import { ConnectAccountBody, ConnectSupervisorBody } from '../../common/dtos';
import { ICreateStudentPayload } from '../payloads/create-student.payload';

export class CreateStudentBody implements ICreateStudentPayload {
  @IsDefined()
  @ValidateNested()
  @Type(() => ConnectAccountBody)
  @ApiProperty({ type: ConnectAccountBody })
  account: ConnectAccountBody;

  @IsOptional()
  @ValidateNested()
  @Type(() => ConnectSupervisorBody)
  @ApiPropertyOptional({ type: ConnectSupervisorBody })
  supervisor?: ConnectSupervisorBody;
}
