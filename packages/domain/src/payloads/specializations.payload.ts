import { IConnectFieldPayload } from './connect.payload';

export interface ICreateSpecializationPayload {
  title: string;
  field: IConnectFieldPayload;
}
