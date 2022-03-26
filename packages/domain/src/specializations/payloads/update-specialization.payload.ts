import { IUpdateManyFieldsRelationsPayload } from '../../common/payloads';

export interface IUpdateSpecializationPayload {
  title?: string;
  fields?: IUpdateManyFieldsRelationsPayload;
}
