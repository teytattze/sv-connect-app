import { IConnectStudentPayload } from './students.connect';

export interface IUpdateOneStudentRelationPayload {
  connect?: IConnectStudentPayload;
  disconnect?: boolean;
}
