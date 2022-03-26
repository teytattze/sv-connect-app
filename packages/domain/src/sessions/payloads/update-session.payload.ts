import { Nullable } from '../../common/types/common.type';

export interface IUpdateSessionPayload {
  token?: Nullable<string>;
  expiredAt?: Nullable<Date>;
}
