import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetProfileByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class GetProfileByAccountIdParam {
  @IsUUID()
  @ApiProperty()
  accountId: string;
}
