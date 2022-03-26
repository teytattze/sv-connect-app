import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  ICreateProfilePayload,
  IProfile,
  IProfilesService,
  IUpdateProfilePayload,
  ProfilesCode,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { handlePrismaError } from './profiles.helper';
import { ProfilesRepository } from './profiles.repository';

@Injectable()
export class ProfilesService implements IProfilesService {
  constructor(private readonly profilesRepository: ProfilesRepository) {}

  async getProfileById(id: string): Promise<IProfile> {
    const [error, profile] = await to<IProfile, any>(
      this.profilesRepository.findProfile({ id }),
    );
    if (error) handlePrismaError(error);
    if (!profile) throw new RpcException(ProfilesCode.PROFILE_NOT_FOUND);
    return profile;
  }

  async getProfileByAccountId(accountId: string): Promise<IProfile> {
    const [error, profile] = await to<IProfile, any>(
      this.profilesRepository.findProfile({ accountId }),
    );
    if (error) handlePrismaError(error);
    if (!profile) throw new RpcException(ProfilesCode.PROFILE_NOT_FOUND);
    return profile;
  }

  async createProfile(payload: ICreateProfilePayload): Promise<IProfile> {
    const [error, profile] = await to<IProfile, any>(
      this.profilesRepository.createProfile(payload),
    );
    if (error) handlePrismaError(error);
    return profile;
  }

  async updateProfileByAccountId(
    accountId: string,
    payload: IUpdateProfilePayload,
  ): Promise<IProfile> {
    const [error, profile] = await to<IProfile, any>(
      this.profilesRepository.updateProfile({ accountId }, payload),
    );
    if (error) handlePrismaError(error);
    return profile;
  }
}
