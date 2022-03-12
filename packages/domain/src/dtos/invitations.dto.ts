import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { InvitationStatus } from '../enums/invitations.enum';
import { IInvitation } from '../interfaces/invitations.interface';
import { ICreateInvitationPayload } from '../payloads/invitations.payload';
import { ConnectInviteeBody, ConnectInviterBody } from './connect.dto';

export class InvitationDto implements IInvitation {
  @ApiProperty()
  id: string;

  @ApiProperty()
  message: string | null;

  @ApiProperty({ enum: InvitationStatus })
  status: InvitationStatus;

  @ApiProperty()
  inviterId: string | null;

  @ApiProperty()
  inviteeId: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class CreateInvitationBody implements ICreateInvitationPayload {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  message?: string;

  @IsEnum(InvitationStatus)
  @IsOptional()
  @ApiPropertyOptional({ enum: InvitationStatus })
  status?: InvitationStatus;

  @IsDefined()
  @ValidateNested()
  @Type(() => ConnectInviterBody)
  @ApiProperty({ type: ConnectInviterBody })
  inviter: ConnectInviterBody;

  @IsDefined()
  @ValidateNested()
  @Type(() => ConnectInviteeBody)
  @ApiProperty({ type: ConnectInviteeBody })
  invitee: ConnectInviteeBody;
}

export class AcceptInvitationParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class RejectInvitationParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}
