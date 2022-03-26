import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetStudentByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class GetStudentByAccountIdParam {
  @IsUUID()
  @ApiProperty()
  accountId: string;
}
