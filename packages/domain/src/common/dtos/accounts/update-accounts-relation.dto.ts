import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { IUpdateOneAccountRelationPayload } from '../../payloads';
import { ConnectAccountBody } from './connect-account.dto';

export class UpdateOneAccountRelationBody
  implements IUpdateOneAccountRelationPayload
{
  @IsOptional()
  @ValidateNested()
  @Type(() => ConnectAccountBody)
  @ApiPropertyOptional({ type: ConnectAccountBody })
  connect?: ConnectAccountBody;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  disconnect?: boolean;
}
