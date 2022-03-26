import { IConnectAccountPayload } from './accounts.connect';

export interface IUpdateOneAccountRelationPayload {
  connect?: IConnectAccountPayload;
  disconnect?: boolean;
}
