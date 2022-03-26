import { ICreateInvitationPayload } from '../payloads/create-invitation.payload';
import { IInvitation } from './invitation.interface';

export interface IInvitationsService {
  createInvitation(payload: ICreateInvitationPayload): Promise<IInvitation>;
  acceptInvitationById(id: string): Promise<IInvitation>;
  rejectInvitationById(id: string): Promise<IInvitation>;
}
