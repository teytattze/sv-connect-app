import { ApiProperty } from '@nestjs/swagger';
import { Project } from '@prisma/client';
import { IsString, IsUUID } from 'class-validator';
import { BaseEntity } from '../../common/entity/base.entity';

export class ProjectEntity extends BaseEntity implements Project {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  summary: string;

  @IsUUID()
  @ApiProperty()
  studentId: string;

  @IsUUID()
  @ApiProperty()
  fieldId: string;
}
