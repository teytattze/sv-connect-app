import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetProjectByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class GetProjectByStudentIdParam {
  @IsUUID()
  @ApiProperty()
  studentId: string;
}
