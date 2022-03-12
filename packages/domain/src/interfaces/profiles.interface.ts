import {
  ICreateProfilePayload,
  IUpdateProfilePayload,
} from 'src/payloads/profiles.payload';

export interface IProfile {
  id: string;
  firstName: string;
  lastName: string;
  headline: string | null;
  summary: string | null;
  pictureUrl: string | null;
  backgroundUrl: string | null;
  accountId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProfilesService {
  createProfile(payload: ICreateProfilePayload): Promise<IProfile>;
  updateProfileByAccountId(
    accountId: string,
    payload: IUpdateProfilePayload,
  ): Promise<IProfile>;
}

export interface IProfilesClient extends Partial<IProfilesService> {}
