import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import {
  ICreateProfilePayload,
  IUpdateProfilePayload,
} from '../payloads/profiles.payload';
import { IProfile } from '../interfaces/profiles.interface';
import { ConnectAccountBody } from './connect.dto';

export class ProfileDto implements IProfile {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  headline: string | null;

  @ApiProperty()
  summary: string | null;

  @ApiProperty()
  pictureUrl: string | null;

  @ApiProperty()
  backgroundUrl: string | null;

  @ApiProperty()
  accountId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class CreateProfileBody implements ICreateProfilePayload {
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  headline?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  summary?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  pictureUrl?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  backgroundUrl?: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => ConnectAccountBody)
  @ApiProperty({ type: ConnectAccountBody })
  account: ConnectAccountBody;
}

export class UpdateProfileByAccountIdParam {
  @IsUUID()
  @ApiProperty()
  accountId: string;
}

export class UpdateProfileBody implements IUpdateProfilePayload {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  lastName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  headline?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  summary?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  pictureUrl?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  backgroundUrl?: string;
}
