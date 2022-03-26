import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetSessionByAccountIdParam {
  @IsUUID()
  @ApiProperty()
  accountId: string;
}
