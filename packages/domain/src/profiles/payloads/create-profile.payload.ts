import { Nullable } from '../../common/types/common.type';
import { IConnectAccountPayload } from '../../common/payloads';

export interface ICreateProfilePayload {
  firstName: string;
  lastName: string;
  headline?: Nullable<string>;
  summary?: Nullable<string>;
  pictureUrl?: Nullable<string>;
  backgroundUrl?: Nullable<string>;
  account: IConnectAccountPayload;
}
