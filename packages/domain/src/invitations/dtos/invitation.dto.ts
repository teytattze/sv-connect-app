import { ApiProperty } from '@nestjs/swagger';
import { InvitationStatus } from '@prisma/client';
import { BaseDto } from '../../common/dtos';
import { IInvitation } from '../interfaces/invitation.interface';

export class InvitationDto extends BaseDto implements IInvitation {
  @ApiProperty()
  message: string;

  @ApiProperty({ enum: InvitationStatus })
  status: InvitationStatus;

  @ApiProperty()
  studentId: string;

  @ApiProperty()
  supervisorId: string;
}
