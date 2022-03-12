import {
  ICreateSupervisorPayload,
  IIndexSupervisorsByPayload,
  IUpdateSupervisorPayload,
} from '../payloads/supervisors.payload';
import { IField } from './fields.interface';
import { ISpecialization } from './specializations.interface';

export interface ISupervisor {
  id: string;
  capacity: number;
  accountId: string;
  field: IField;
  specializations: ISpecialization[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ISupervisorsService {
  indexSupervisors(by?: IIndexSupervisorsByPayload): Promise<ISupervisor[]>;
  getSupervisorById(id: string): Promise<ISupervisor>;
  getSupervisorByAccountId(accountId: string): Promise<ISupervisor>;
  createSupervisor(payload: ICreateSupervisorPayload): Promise<ISupervisor>;
  updateSupervisorByAccountId(
    accountId: string,
    payload: IUpdateSupervisorPayload,
  ): Promise<ISupervisor>;
}

export interface ISupervisorsClient extends Partial<ISupervisorsService> {}
