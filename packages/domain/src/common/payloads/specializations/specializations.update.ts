import { IConnectSpecializationPayload } from './specializations.connect';
import { IDisconnectSpecializationPayload } from './specializations.disconnect';

export interface IUpdateManySpecializationsRelationPayload {
  connect?: IConnectSpecializationPayload[];
  disconnect?: IDisconnectSpecializationPayload[];
}
