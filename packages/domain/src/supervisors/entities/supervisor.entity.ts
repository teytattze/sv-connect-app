import { ApiProperty } from '@nestjs/swagger';
import { Supervisor } from '@prisma/client';
import { IsInt, IsUUID } from 'class-validator';
import { BaseEntity } from '../../common/entity/base.entity';

export class SupervisorEntity extends BaseEntity implements Supervisor {
  @IsInt()
  @ApiProperty()
  capacity: number;

  @IsUUID()
  @ApiProperty()
  accountId: string;

  @IsUUID()
  @ApiProperty()
  fieldId: string;
}
