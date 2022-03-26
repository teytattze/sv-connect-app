import { InvitationStatus } from '@prisma/client';
import {
  IConnectStudentPayload,
  IConnectSupervisorPayload,
} from '../../common/payloads';

export interface ICreateInvitationPayload {
  message?: string;
  status?: InvitationStatus;
  student: IConnectStudentPayload;
  supervisor: IConnectSupervisorPayload;
}
