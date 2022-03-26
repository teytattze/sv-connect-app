import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsUUID } from 'class-validator';

export class BaseDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsDate()
  @ApiProperty()
  updatedAt: Date;
}
