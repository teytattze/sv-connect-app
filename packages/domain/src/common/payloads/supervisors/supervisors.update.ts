import { IConnectSupervisorPayload } from './supervisors.connect';

export interface IUpdateOneSupervisorRelationPayload {
  connect?: IConnectSupervisorPayload;
  disconnect?: boolean;
}
