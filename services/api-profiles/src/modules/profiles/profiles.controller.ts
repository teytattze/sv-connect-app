import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProfilesPattern } from '@sv-connect/common';
import {
  ICreateProfilePayload,
  IProfile,
  IProfilesClient,
  IUpdateProfilePayload,
} from '@sv-connect/domain';
import { ProfilesService } from './profiles.service';

@Controller()
export class ProfilesController implements IProfilesClient {
  constructor(private readonly profilesService: ProfilesService) {}

  @MessagePattern(ProfilesPattern.CREATE_PROFILE)
  async createProfile(
    @Payload('data') payload: ICreateProfilePayload,
  ): Promise<IProfile> {
    return await this.profilesService.createProfile(payload);
  }

  @MessagePattern(ProfilesPattern.UPDATE_PROFILE_BY_ACCOUNT_ID)
  async updateProfileByAccountId(
    @Payload('accountId') accountId: string,
    @Payload('data') payload: IUpdateProfilePayload,
  ): Promise<IProfile> {
    return await this.profilesService.updateProfileByAccountId(
      accountId,
      payload,
    );
  }
}
