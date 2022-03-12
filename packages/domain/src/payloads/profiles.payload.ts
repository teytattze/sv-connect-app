import { IConnectAccountPayload } from './connect.payload';

export interface ICreateProfilePayload {
  firstName: string;
  lastName: string;
  headline?: string;
  summary?: string;
  pictureUrl?: string;
  backgroundUrl?: string;
  account: IConnectAccountPayload;
}

export interface IUpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  headline?: string;
  summary?: string;
  pictureUrl?: string;
  backgroundUrl?: string;
}
