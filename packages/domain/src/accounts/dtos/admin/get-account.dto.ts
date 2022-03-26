import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class AdminGetAccountByEmailParam {
  @IsEmail()
  @ApiProperty()
  email: string;
}
