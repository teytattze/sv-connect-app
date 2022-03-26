import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { IUpdateAccountPayload } from '../payloads/update-account.payload';

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

export class UpdateAccountByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}
