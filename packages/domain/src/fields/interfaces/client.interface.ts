import { IField } from './field.interface';
import { ICreateFieldPayload } from '../payloads/create-field.payload';
import { IUpdateFieldPayload } from '../payloads/update-field.payload';
import { ICoreApiResponse } from '../../common/api';

export interface IFieldsClient {
  indexFields?(): Promise<ICoreApiResponse<IField[]>>;
  getFieldById?(id: string): Promise<ICoreApiResponse<IField>>;
  createField?(payload: ICreateFieldPayload): Promise<ICoreApiResponse<IField>>;
  updateFieldById?(
    id: string,
    payload: IUpdateFieldPayload,
  ): Promise<ICoreApiResponse<IField>>;
  deleteFieldById?(id: string): Promise<ICoreApiResponse<void>>;
}
