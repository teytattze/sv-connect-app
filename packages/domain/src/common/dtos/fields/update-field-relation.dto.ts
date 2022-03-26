import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { ConnectFieldBody } from './connect-field.dto';
import { DisconnectFieldBody } from './disconnect-field.dto';
import {
  IUpdateManyFieldsRelationsPayload,
  IUpdateOneFieldRelationPayload,
} from '../../payloads';

export class UpdateOneFieldRelationBody
  implements IUpdateOneFieldRelationPayload
{
  @IsOptional()
  @ValidateNested()
  @Type(() => ConnectFieldBody)
  @ApiPropertyOptional({ type: ConnectFieldBody })
  connect?: ConnectFieldBody;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  disconnect?: boolean;
}

export class UpdateManyFieldsRelationBody
  implements IUpdateManyFieldsRelationsPayload
{
  @IsOptional()
  @ValidateNested()
  @Type(() => ConnectFieldBody)
  @ApiPropertyOptional({ isArray: true, type: ConnectFieldBody })
  connect?: ConnectFieldBody[];

  @IsOptional()
  @ValidateNested()
  @Type(() => DisconnectFieldBody)
  @ApiPropertyOptional({ isArray: true, type: DisconnectFieldBody })
  disconnect?: DisconnectFieldBody[];
}
