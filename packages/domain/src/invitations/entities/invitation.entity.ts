import { ApiProperty } from '@nestjs/swagger';
import { Invitation, InvitationStatus } from '@prisma/client';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { BaseEntity } from '../../common/entity/base.entity';

export class InvitationEntity extends BaseEntity implements Invitation {
  @IsString()
  @ApiProperty()
  message: string;

  @IsEnum(InvitationStatus)
  @ApiProperty()
  status: InvitationStatus;

  @IsUUID()
  @ApiProperty()
  studentId: string;

  @IsUUID()
  @ApiProperty()
  supervisorId: string;
}
