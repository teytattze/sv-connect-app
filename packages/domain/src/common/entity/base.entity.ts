import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsUUID } from 'class-validator';

export class BaseEntity {
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
