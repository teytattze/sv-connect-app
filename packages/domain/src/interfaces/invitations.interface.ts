import { ICreateInvitationPayload } from '../payloads/invitations.payload';
import { InvitationStatus } from '../enums/invitations.enum';

export interface IInvitation {
  id: string;
  message: string | null;
  status: InvitationStatus;
  inviterId: string | null;
  inviteeId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInvitationsService {
  createInvitation(payload: ICreateInvitationPayload): Promise<IInvitation>;
  acceptInvitationById(id: string): Promise<IInvitation>;
  rejectInvitationById(id: string): Promise<IInvitation>;
}

export interface IInvitationsClient extends Partial<IInvitationsService> {}
