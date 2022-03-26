import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeleteFieldByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}
