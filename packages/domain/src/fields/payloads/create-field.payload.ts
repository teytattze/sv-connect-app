import { IConnectSpecializationPayload } from '../../common/payloads';

export interface ICreateFieldPayload {
  title: string;
  specializations?: IConnectSpecializationPayload[];
}
