import { ICoreApiResponse } from '../../common/api';
import { ICreateProfilePayload } from '../payloads/create-profile.payload';
import { IUpdateProfilePayload } from '../payloads/update-profile.payload';
import { IProfile } from './profile.interface';

export interface IProfilesClient {
  createProfile?(
    payload: ICreateProfilePayload,
  ): Promise<ICoreApiResponse<IProfile>>;
  updateProfileByAccountId?(
    accountId: string,
    payload: IUpdateProfilePayload,
  ): Promise<ICoreApiResponse<IProfile>>;
}
