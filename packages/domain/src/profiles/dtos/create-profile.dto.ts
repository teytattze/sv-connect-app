import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ConnectAccountBody } from '../../common/dtos';
import { Nullable } from '../../common/types/common.type';
import { ICreateProfilePayload } from '../payloads/create-profile.payload';

export class CreateProfileBody implements ICreateProfilePayload {
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  headline?: Nullable<string>;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  summary?: Nullable<string>;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  pictureUrl?: Nullable<string>;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  backgroundUrl?: Nullable<string>;

  @IsDefined()
  @ValidateNested()
  @Type(() => ConnectAccountBody)
  @ApiProperty({ type: ConnectAccountBody })
  account: ConnectAccountBody;
}
