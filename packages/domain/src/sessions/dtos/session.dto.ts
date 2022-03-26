import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entity/base.entity';
import { Nullable } from '../../common/types/common.type';
import { ISession } from '../interfaces/session.interface';

export class Session extends BaseEntity implements ISession {
  @ApiProperty()
  token: Nullable<string>;

  @ApiProperty()
  expiredAt: Nullable<Date>;

  @ApiProperty()
  accountId: string;
}
