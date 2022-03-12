import { IConnectAccountPayload } from './connect.payload';

export interface ICreateSessionPayload {
  account: IConnectAccountPayload;
}

export interface IUpdateSessionPayload {
  token?: string | null;
  expiredAt?: Date | null;
}
