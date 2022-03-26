import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeleteSpecializationByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}
