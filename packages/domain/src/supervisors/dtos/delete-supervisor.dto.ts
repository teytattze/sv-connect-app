import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeleteSupervisorByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}
