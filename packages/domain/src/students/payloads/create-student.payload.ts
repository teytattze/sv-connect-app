import {
  IConnectAccountPayload,
  IConnectSupervisorPayload,
} from '../../common/payloads';

export interface ICreateStudentPayload {
  account: IConnectAccountPayload;
  supervisor?: IConnectSupervisorPayload;
}
