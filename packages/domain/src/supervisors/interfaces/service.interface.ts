import { ICreateSupervisorPayload } from '../payloads/create-supervisor.payload';
import { IIndexSupervisorsByPayload } from '../payloads/index-supervisors.payload';
import { IUpdateSupervisorPayload } from '../payloads/update-supervisor.payload';
import { ISupervisor } from './supervisor.interface';

export interface ISupervisorsService {
  indexSupervisors(by?: IIndexSupervisorsByPayload): Promise<ISupervisor[]>;
  getSupervisorById(id: string): Promise<ISupervisor>;
  getSupervisorByAccountId(accountId: string): Promise<ISupervisor>;
  createSupervisor(payload: ICreateSupervisorPayload): Promise<ISupervisor>;
  updateSupervisorById(
    id: string,
    payload: IUpdateSupervisorPayload,
  ): Promise<ISupervisor>;
  updateSupervisorByAccountId(
    accountId: string,
    payload: IUpdateSupervisorPayload,
  ): Promise<ISupervisor>;
  deleteSupervisorById(id: string): Promise<void>;
}
