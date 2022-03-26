import {
  IConnectFieldPayload,
  IConnectSpecializationPayload,
  IConnectStudentPayload,
} from '../../common/payloads';

export interface ICreateProjectPayload {
  title: string;
  summary: string;
  field: IConnectFieldPayload;
  specializations: IConnectSpecializationPayload[];
  student: IConnectStudentPayload;
}
