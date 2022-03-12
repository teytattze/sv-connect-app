import {
  IConnectFieldPayload,
  IConnectSpecializationPayload,
  IConnectStudentPayload,
} from './connect.payload';

export interface ICreateProjectPayload {
  title: string;
  summary: string;
  field: IConnectFieldPayload;
  specializations: IConnectSpecializationPayload[];
  student: IConnectStudentPayload;
}

export interface IUpdateProjectPayload {
  title?: string;
  summary?: string;
  field?: IConnectFieldPayload;
  specializations?: IConnectSpecializationPayload[];
}
