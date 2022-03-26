import { ICreateProfilePayload } from '../payloads/create-profile.payload';
import { IUpdateProfilePayload } from '../payloads/update-profile.payload';
import { IProfile } from './profile.interface';

export interface IProfilesService {
  createProfile(payload: ICreateProfilePayload): Promise<IProfile>;
  updateProfileByAccountId(
    accountId: string,
    payload: IUpdateProfilePayload,
  ): Promise<IProfile>;
}
