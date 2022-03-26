import { ApiProperty } from '@nestjs/swagger';
import { Session } from '@prisma/client';
import { IsDate, IsString, IsUUID } from 'class-validator';
import { BaseEntity } from '../../common/entity/base.entity';
import { Nullable } from '../../common/types/common.type';

export class SessionEntity extends BaseEntity implements Session {
  @IsString()
  @ApiProperty()
  token: Nullable<string>;

  @IsDate()
  @ApiProperty()
  expiredAt: Nullable<Date>;

  @IsUUID()
  @ApiProperty()
  accountId: string;
}
