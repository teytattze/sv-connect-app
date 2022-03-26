import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProfilesPattern } from '@sv-connect/common';
import {
  CoreApiResponse,
  ICoreApiResponse,
  ICreateProfilePayload,
  IProfile,
  IProfilesClient,
  IUpdateProfilePayload,
} from '@sv-connect/domain';
import { ProfilesService } from './profiles.service';

@Controller()
export class ProfilesController implements IProfilesClient {
  constructor(private readonly profilesService: ProfilesService) {}

  @MessagePattern(ProfilesPattern.GET_PROFILE_BY_ID)
  async getProfileById(
    @Payload('id') id: string,
  ): Promise<ICoreApiResponse<IProfile>> {
    const profile = await this.profilesService.getProfileById(id);
    return CoreApiResponse.success(profile);
  }

  @MessagePattern(ProfilesPattern.GET_PROFILE_BY_ACCOUNT_ID)
  async getProfileByAccountId(
    @Payload('accountId') accountId: string,
  ): Promise<ICoreApiResponse<IProfile>> {
    const profile = await this.profilesService.getProfileByAccountId(accountId);
    return CoreApiResponse.success(profile);
  }

  @MessagePattern(ProfilesPattern.CREATE_PROFILE)
  async createProfile(
    @Payload('data') payload: ICreateProfilePayload,
  ): Promise<ICoreApiResponse<IProfile>> {
    const profile = await this.profilesService.createProfile(payload);
    return CoreApiResponse.success(profile);
  }

  @MessagePattern(ProfilesPattern.UPDATE_PROFILE_BY_ACCOUNT_ID)
  async updateProfileByAccountId(
    @Payload('accountId') accountId: string,
    @Payload('data') payload: IUpdateProfilePayload,
  ): Promise<ICoreApiResponse<IProfile>> {
    const profile = await this.profilesService.updateProfileByAccountId(
      accountId,
      payload,
    );
    return CoreApiResponse.success(profile);
  }
}
