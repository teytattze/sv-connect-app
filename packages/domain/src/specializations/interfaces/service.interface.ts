import { ICreateSpecializationPayload } from '../payloads/create-specialization.payload';
import { IUpdateSpecializationPayload } from '../payloads/update-specialization.payload';
import { ISpecialization } from './specialization.interface';

export interface ISpecializationsService {
  indexSpecializations(): Promise<ISpecialization[]>;
  getSpecializationById(id: string): Promise<ISpecialization>;
  createSpecialization(
    payload: ICreateSpecializationPayload,
  ): Promise<ISpecialization>;
  updateSpecializationById(
    id: string,
    payload: IUpdateSpecializationPayload,
  ): Promise<ISpecialization>;
  deleteSpecializationById(id: string): Promise<void>;
}
