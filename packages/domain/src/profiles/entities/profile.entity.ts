import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Profile } from '@prisma/client';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { BaseEntity } from '../../common/entity/base.entity';

export class ProfileEntity extends BaseEntity implements Profile {
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  headline: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  summary: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  pictureUrl: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  backgroundUrl: string;

  @IsUUID()
  @ApiProperty()
  accountId: string;
}
