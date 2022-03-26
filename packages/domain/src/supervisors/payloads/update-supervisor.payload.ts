import {
  IUpdateManySpecializationsRelationPayload,
  IUpdateOneFieldRelationPayload,
} from '../../common/payloads';

export interface IUpdateSupervisorPayload {
  capacity?: number;
  field?: IUpdateOneFieldRelationPayload;
  specializations?: IUpdateManySpecializationsRelationPayload;
}
