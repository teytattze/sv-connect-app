import { ApiProperty } from '@nestjs/swagger';
import { Student } from '@prisma/client';
import { IsUUID } from 'class-validator';
import { BaseEntity } from '../../common/entity/base.entity';

export class StudentEntity extends BaseEntity implements Student {
  @IsUUID()
  @ApiProperty()
  accountId: string;

  @IsUUID()
  @ApiProperty()
  supervisorId: string;
}
