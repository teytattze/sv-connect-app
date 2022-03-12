import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateProfileBody,
  UpdateProfileByAccountIdParam,
  UpdateProfileBody,
  ProfileDto,
} from '@sv-connect/domain';
import { ProfilesService } from './profiles.service';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post('create')
  @ApiResponse({
    status: 200,
    description: 'Registered',
    type: ProfileDto,
  })
  @ApiOperation({
    operationId: 'registerProfile',
    summary: "Register a new account's profile",
  })
  async createProfile(@Body() body: CreateProfileBody): Promise<ProfileDto> {
    return await this.profilesService.createProfile(body);
  }

  @Put('update/accounts/:accountId')
  @ApiResponse({
    status: 200,
    description: 'Updated',
    type: ProfileDto,
  })
  @ApiOperation({
    operationId: 'updateProfileByAccountId',
    summary: "Update an account's profile by account id",
  })
  async updateProfileByAccountId(
    @Body() body: UpdateProfileBody,
    @Param() param: UpdateProfileByAccountIdParam,
  ): Promise<ProfileDto> {
    return await this.profilesService.updateProfileByAccountId(
      param.accountId,
      body,
    );
  }
}
