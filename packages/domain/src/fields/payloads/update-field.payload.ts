import { IUpdateManySpecializationsRelationPayload } from '../../common/payloads';

export interface IUpdateFieldPayload {
  title?: string;
  specializations?: IUpdateManySpecializationsRelationPayload;
}
