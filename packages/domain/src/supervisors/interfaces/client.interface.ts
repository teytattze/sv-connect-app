import { ICoreServiceResponse } from '../../common';
import { ICreateSupervisorPayload } from '../payloads/create-supervisor.payload';
import { IIndexSupervisorsByPayload } from '../payloads/index-supervisors.payload';
import { IUpdateSupervisorPayload } from '../payloads/update-supervisor.payload';
import { ISupervisor } from './supervisor.interface';

export interface ISupervisorsClient {
  indexSupervisors?(
    by?: IIndexSupervisorsByPayload,
  ): Promise<ICoreServiceResponse<ISupervisor[]>>;
  getSupervisorById?(id: string): Promise<ICoreServiceResponse<ISupervisor>>;
  getSupervisorByAccountId?(
    accountId: string,
  ): Promise<ICoreServiceResponse<ISupervisor>>;
  createSupervisor?(
    payload: ICreateSupervisorPayload,
  ): Promise<ICoreServiceResponse<ISupervisor>>;
  updateSupervisorById?(
    id: string,
    payload: IUpdateSupervisorPayload,
  ): Promise<ICoreServiceResponse<ISupervisor>>;
  updateSupervisorByAccountId?(
    accountId: string,
    payload: IUpdateSupervisorPayload,
  ): Promise<ICoreServiceResponse<ISupervisor>>;
  deleteSupervisorById?(id: string): Promise<ICoreServiceResponse<null>>;
}
