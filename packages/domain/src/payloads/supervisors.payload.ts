import {
  IConnectAccountPayload,
  IConnectFieldPayload,
  IConnectSpecializationPayload,
} from './connect.payload';

export interface ICreateSupervisorPayload {
  capacity?: number;
  account: IConnectAccountPayload;
  field: IConnectFieldPayload;
  specializations: IConnectSpecializationPayload[];
}

export interface IUpdateSupervisorPayload {
  capacity?: number;
  field?: IConnectFieldPayload;
  specializations?: IConnectSpecializationPayload[];
}

export interface IIndexSupervisorsByPayload {
  fieldId?: string;
  maxCapacity?: number;
  minCapacity?: number;
}
