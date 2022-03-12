import { ICreateSpecializationPayload } from '../payloads/specializations.payload';

export interface ISpecialization {
  id: string;
  title: string;
  fieldId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISpecializationsService {
  createSpecialization(
    payload: ICreateSpecializationPayload,
  ): Promise<ISpecialization>;
}

export interface ISpecializationsClient
  extends Partial<ISpecializationsService> {}
