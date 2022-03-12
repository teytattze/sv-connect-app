import { InvitationStatus } from '../enums/invitations.enum';
import {
  IConnectInviteePayload,
  IConnectInviterPayload,
} from './connect.payload';

export interface ICreateInvitationPayload {
  message?: string;
  status?: InvitationStatus;
  inviter: IConnectInviterPayload;
  invitee: IConnectInviteePayload;
}

export interface IUpdateInvitationPayload {
  message?: string;
  status?: InvitationStatus;
}
