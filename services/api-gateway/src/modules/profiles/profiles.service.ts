import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PROFILES_CLIENT, ProfilesPattern } from '@sv-connect/common';
import {
  CoreHttpException,
  ICoreServiceResponse,
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

  async getProfileById(id: string): Promise<ICoreServiceResponse<IProfile>> {
    const [error, response] = await to<
      ICoreServiceResponse<IProfile>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(ProfilesPattern.GET_PROFILE_BY_ID, { id }),
      ),
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async getProfileByAccountId(
    accountId: string,
  ): Promise<ICoreServiceResponse<IProfile>> {
    const [error, response] = await to<
      ICoreServiceResponse<IProfile>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(ProfilesPattern.GET_PROFILE_BY_ACCOUNT_ID, {
          accountId,
        }),
      ),
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async createProfile(
    payload: ICreateProfilePayload,
  ): Promise<ICoreServiceResponse<IProfile>> {
    const [error, response] = await to<
      ICoreServiceResponse<IProfile>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(ProfilesPattern.CREATE_PROFILE, { data: payload }),
      ),
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async updateProfileByAccountId(
    accountId: string,
    payload: IUpdateProfilePayload,
  ): Promise<ICoreServiceResponse<IProfile>> {
    const [error, response] = await to<
      ICoreServiceResponse<IProfile>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(ProfilesPattern.UPDATE_PROFILE_BY_ACCOUNT_ID, {
          accountId,
          data: payload,
        }),
      ),
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }
}
