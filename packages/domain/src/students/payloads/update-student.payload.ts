import { IUpdateOneSupervisorRelationPayload } from '../../common/payloads';

export interface IUpdateStudentPayload {
  supervisor?: IUpdateOneSupervisorRelationPayload;
}
