import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  handleClientServiceError,
  PROFILES_CLIENT,
  ProfilesPattern,
} from '@sv-connect/common';
import {
  ICreateProfilePayload,
  IProfile,
  IProfilesClient,
  IUpdateProfilePayload,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProfilesService implements IProfilesClient {
  constructor(@Inject(PROFILES_CLIENT) private readonly client: ClientProxy) {}

  async createProfile(payload: ICreateProfilePayload): Promise<IProfile> {
    const [err, profile] = await to(
      firstValueFrom(
        this.client.send(ProfilesPattern.CREATE_PROFILE, { data: payload }),
      ),
    );
    if (err) handleClientServiceError(err);
    return profile;
  }

  async updateProfileByAccountId(
    accountId: string,
    payload: IUpdateProfilePayload,
  ): Promise<IProfile> {
    const [err, profile] = await to(
      firstValueFrom(
        this.client.send(ProfilesPattern.UPDATE_PROFILE_BY_ACCOUNT_ID, {
          accountId,
          data: payload,
        }),
      ),
    );
    if (err) handleClientServiceError(err);
    return profile;
  }
}
