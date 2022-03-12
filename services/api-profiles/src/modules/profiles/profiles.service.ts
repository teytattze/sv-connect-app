import { Injectable } from '@nestjs/common';
import {
  ICreateProfilePayload,
  IProfile,
  IUpdateProfilePayload,
} from '@sv-connect/domain';
import { ProfilesRepository } from './profiles.repository';

@Injectable()
export class ProfilesService {
  constructor(private readonly profilesRepository: ProfilesRepository) {}

  async getProfileById(id: string): Promise<IProfile> {
    return await this.profilesRepository.findProfile({ id });
  }

  async getProfileByAccountId(accountId: string): Promise<IProfile> {
    return await this.profilesRepository.findProfile({ accountId });
  }

  async createProfile(payload: ICreateProfilePayload): Promise<IProfile> {
    return await this.profilesRepository.createProfile(payload);
  }

  async updateProfileByAccountId(
    accountId: string,
    payload: IUpdateProfilePayload,
  ): Promise<IProfile> {
    return await this.profilesRepository.updateProfile({ accountId }, payload);
  }
}
