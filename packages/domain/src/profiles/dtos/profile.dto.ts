import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../common/dtos';
import { Nullable } from '../../common/types/common.type';
import { IProfile } from '../interfaces/profile.interface';

export class ProfileDto extends BaseDto implements IProfile {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  headline: Nullable<string>;

  @ApiProperty()
  summary: Nullable<string>;

  @ApiProperty()
  pictureUrl: Nullable<string>;

  @ApiProperty()
  backgroundUrl: Nullable<string>;

  @ApiProperty()
  accountId: string;
}
