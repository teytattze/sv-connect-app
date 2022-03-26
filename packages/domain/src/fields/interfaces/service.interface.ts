import { IField } from './field.interface';
import { ICreateFieldPayload } from '../payloads/create-field.payload';
import { IUpdateFieldPayload } from '../payloads/update-field.payload';

export interface IFieldsService {
  indexFields(): Promise<IField[]>;
  getFieldById(id: string): Promise<IField>;
  createField(payload: ICreateFieldPayload): Promise<IField>;
  updateFieldById(id: string, payload: IUpdateFieldPayload): Promise<IField>;
  deleteFieldById(id: string): Promise<void>;
}
