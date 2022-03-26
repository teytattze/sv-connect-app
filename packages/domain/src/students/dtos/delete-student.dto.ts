import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeleteStudentByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}
