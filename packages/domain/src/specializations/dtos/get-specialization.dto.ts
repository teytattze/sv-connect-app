import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetSpecializationByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}
