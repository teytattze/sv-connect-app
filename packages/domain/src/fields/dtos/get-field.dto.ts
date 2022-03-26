import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetFieldByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}
