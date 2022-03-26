import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AccountRole } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { ICreateAccountPayload } from '../payloads/create-account.payload';

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
