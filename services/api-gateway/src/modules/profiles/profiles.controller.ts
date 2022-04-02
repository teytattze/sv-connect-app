import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateProfileBody,
  GetProfileByIdParam,
  GetProfileByAccountIdParam,
  UpdateProfileByAccountIdParam,
  UpdateProfileBody,
  ProfileDto,
  CoreHttpResponse,
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
  async createProfile(
    @Body() body: CreateProfileBody,
  ): Promise<CoreHttpResponse<ProfileDto>> {
    const { data } = await this.profilesService.createProfile(body);
    return CoreHttpResponse.success({ data });
  }

  @Get(':id')
  async getProfileById(
    @Param() { id }: GetProfileByIdParam,
  ): Promise<CoreHttpResponse<ProfileDto>> {
    const { data } = await this.profilesService.getProfileById(id);
    return CoreHttpResponse.success({ data });
  }

  @Get('accounts/:accountId')
  async getProfileByAccountId(
    @Param() { accountId }: GetProfileByAccountIdParam,
  ): Promise<CoreHttpResponse<ProfileDto>> {
    const { data } = await this.profilesService.getProfileByAccountId(
      accountId,
    );
    return CoreHttpResponse.success({ data });
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
    @Param() { accountId }: UpdateProfileByAccountIdParam,
    @Body() body: UpdateProfileBody,
  ): Promise<CoreHttpResponse<ProfileDto>> {
    const { data } = await this.profilesService.updateProfileByAccountId(
      accountId,
      body,
    );
    return CoreHttpResponse.success({ data });
  }
}
