import {
  IConnectAccountPayload,
  IConnectFieldPayload,
  IConnectSpecializationPayload,
} from '../../common/payloads';

export interface ICreateSupervisorPayload {
  capacity?: number;
  account: IConnectAccountPayload;
  field: IConnectFieldPayload;
  specializations: IConnectSpecializationPayload[];
}
