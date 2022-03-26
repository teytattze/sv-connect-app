import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { ConnectStudentBody } from './connect-student.dto';
import { IUpdateOneStudentRelationPayload } from '../../payloads';

export class UpdateOneStudentRelationBody
  implements IUpdateOneStudentRelationPayload
{
  @IsOptional()
  @ValidateNested()
  @Type(() => ConnectStudentBody)
  @ApiPropertyOptional({ type: ConnectStudentBody })
  connect?: ConnectStudentBody;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  disconnect?: boolean;
}
