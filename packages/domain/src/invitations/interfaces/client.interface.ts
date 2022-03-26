import { ICoreApiResponse } from '../../common/api';
import { ICreateInvitationPayload } from '../payloads/create-invitation.payload';
import { IInvitation } from './invitation.interface';

export interface IInvitationsClient {
  createInvitation?(
    payload: ICreateInvitationPayload,
  ): Promise<ICoreApiResponse<IInvitation>>;
  acceptInvitationById?(id: string): Promise<ICoreApiResponse<IInvitation>>;
  rejectInvitationById?(id: string): Promise<ICoreApiResponse<IInvitation>>;
}
