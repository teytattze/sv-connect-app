import { IConnectFieldPayload } from '../../common/payloads';

export interface ICreateSpecializationPayload {
  title: string;
  fields?: IConnectFieldPayload[];
}
