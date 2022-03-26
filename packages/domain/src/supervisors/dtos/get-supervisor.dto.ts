import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetSupervisorByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class GetSupervisorByAccountIdParam {
  @IsUUID()
  @ApiProperty()
  accountId: string;
}
