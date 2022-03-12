import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IAccount } from '../interfaces/accounts.interface';
import { AccountRole } from '../enums/accounts.enum';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  ICreateAccountPayload,
  IUpdateAccountPayload,
} from '../payloads/accounts.payload';

export class AccountDto implements IAccount {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  emailVerified: boolean;

  @ApiPropertyOptional()
  password?: string;

  @ApiProperty({
    enum: AccountRole,
  })
  role: AccountRole;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class AdminGetAccountByEmailParam {
  @IsEmail()
  @ApiProperty()
  email: string;
}

export class GetAccountByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class GetAccountByEmailParam {
  @IsEmail()
  @ApiProperty()
  email: string;
}

export class CreateAccountBody implements ICreateAccountPayload {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  emailVerified?: boolean;

  @IsString()
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsEnum(AccountRole)
  @ApiPropertyOptional({ enum: AccountRole })
  role?: AccountRole;
}

export class UpdateAccountByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class UpdateAccountBody implements IUpdateAccountPayload {
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  email?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  emailVerified?: boolean;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  password?: string;
}

export class DeleteAccountByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}
