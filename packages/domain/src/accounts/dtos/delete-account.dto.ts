import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeleteAccountByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}
