import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InvitationStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ConnectStudentBody, ConnectSupervisorBody } from '../../common/dtos';
import { ICreateInvitationPayload } from '../payloads/create-invitation.payload';

export class CreateInvitationBody implements ICreateInvitationPayload {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  message?: string;

  @IsOptional()
  @IsEnum(InvitationStatus)
  @ApiPropertyOptional({ enum: InvitationStatus })
  status?: InvitationStatus;

  @IsDefined()
  @ValidateNested()
  @Type(() => ConnectStudentBody)
  @ApiProperty({ type: ConnectStudentBody })
  student: ConnectStudentBody;

  @IsDefined()
  @ValidateNested()
  @Type(() => ConnectSupervisorBody)
  @ApiProperty({ type: ConnectSupervisorBody })
  supervisor: ConnectSupervisorBody;
}
