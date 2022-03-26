import { IConnectFieldPayload } from './fields.connect';
import { IDisconnectFieldPayload } from './fields.disconnect';

export interface IUpdateOneFieldRelationPayload {
  connect?: IConnectFieldPayload;
  disconnect?: boolean;
}

export interface IUpdateManyFieldsRelationsPayload {
  connect?: IConnectFieldPayload[];
  disconnect?: IDisconnectFieldPayload[];
}
