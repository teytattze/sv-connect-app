import { ICoreServiceResponse } from '../../common';
import { ICreateInvitationPayload } from '../payloads/create-invitation.payload';
import { IInvitation } from './invitation.interface';

export interface IInvitationsClient {
  createInvitation?(
    payload: ICreateInvitationPayload,
  ): Promise<ICoreServiceResponse<IInvitation>>;
  acceptInvitationById?(id: string): Promise<ICoreServiceResponse<IInvitation>>;
  rejectInvitationById?(id: string): Promise<ICoreServiceResponse<IInvitation>>;
}
