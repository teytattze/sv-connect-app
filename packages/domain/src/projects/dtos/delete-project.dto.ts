import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeleteProjectByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}
