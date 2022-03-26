import {
  IUpdateManySpecializationsRelationPayload,
  IUpdateOneFieldRelationPayload,
} from '../../common/payloads';

export interface IUpdateProjectPayload {
  title?: string;
  summary?: string;
  field?: IUpdateOneFieldRelationPayload;
  specializations?: IUpdateManySpecializationsRelationPayload;
}
