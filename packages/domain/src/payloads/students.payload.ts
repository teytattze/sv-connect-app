import {
  IConnectAccountPayload,
  IConnectSupervisorPayload,
} from './connect.payload';

export interface ICreateStudentPayload {
  account: IConnectAccountPayload;
  supervisor?: IConnectSupervisorPayload;
}

export interface IUpdateStudentPayload {
  supervisor?: IConnectSupervisorPayload;
}
