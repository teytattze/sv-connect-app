import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AccountRole } from '@prisma/client';
import { IAccount } from '../interfaces/account.interface';
import { BaseDto } from '../../common/dtos/base.dto';

export class AccountDto extends BaseDto implements IAccount {
  @ApiProperty()
  email: string;

  @ApiProperty()
  emailVerified: boolean;

  @ApiPropertyOptional()
  password?: string;

  @ApiProperty()
  role: AccountRole;
}
