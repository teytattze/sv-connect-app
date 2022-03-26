import { ICoreApiResponse } from '../../common/api';
import { ICreateSpecializationPayload } from '../payloads/create-specialization.payload';
import { IUpdateSpecializationPayload } from '../payloads/update-specialization.payload';
import { ISpecialization } from './specialization.interface';

export interface ISpecializationsClient {
  indexSpecializations?(): Promise<ICoreApiResponse<ISpecialization[]>>;
  getSpecializationById?(
    id: string,
  ): Promise<ICoreApiResponse<ISpecialization>>;
  createSpecialization?(
    payload: ICreateSpecializationPayload,
  ): Promise<ICoreApiResponse<ISpecialization>>;
  updateSpecializationById?(
    id: string,
    payload: IUpdateSpecializationPayload,
  ): Promise<ICoreApiResponse<ISpecialization>>;
  deleteSpecializationById?(id: string): Promise<ICoreApiResponse<null>>;
}
