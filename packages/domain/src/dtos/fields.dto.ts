import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ICreateFieldPayload } from 'src/payloads/fields.payload';
import { IField } from '../interfaces/fields.interface';

export class FieldDto implements IField {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class CreateFieldBody implements ICreateFieldPayload {
  @IsString()
  @ApiProperty()
  title: string;
}
