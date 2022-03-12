import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsString, ValidateNested } from 'class-validator';
import { ICreateSpecializationPayload } from 'src/payloads/specializations.payload';
import { ISpecialization } from '../interfaces/specializations.interface';
import { ConnectFieldBody } from './connect.dto';

export class SpecializationDto implements ISpecialization {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  fieldId: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class CreateSpecializationBody implements ICreateSpecializationPayload {
  @IsString()
  @ApiProperty()
  title: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => ConnectFieldBody)
  @ApiProperty({ type: ConnectFieldBody })
  field: ConnectFieldBody;
}
