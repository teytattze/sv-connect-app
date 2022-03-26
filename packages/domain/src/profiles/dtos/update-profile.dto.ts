import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Nullable } from '../../common/types/common.type';
import { IUpdateProfilePayload } from '../payloads/update-profile.payload';

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
}

export class UpdateProfileByAccountIdParam {
  @IsUUID()
  @ApiProperty()
  accountId: string;
}
