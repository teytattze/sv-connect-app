import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsUUID } from 'class-validator';

export class GetAccountByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class GetAccountByEmailParam {
  @IsEmail()
  @ApiProperty()
  email: string;
}
