import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AcceptInvitationByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class RejectInvitationByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}
