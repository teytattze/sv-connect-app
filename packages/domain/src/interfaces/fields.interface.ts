import { ICreateFieldPayload } from '../payloads/fields.payload';

export interface IField {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFieldsService {
  createField(payload: ICreateFieldPayload): Promise<IField>;
}

export interface IFieldsClient extends Partial<IFieldsService> {}
