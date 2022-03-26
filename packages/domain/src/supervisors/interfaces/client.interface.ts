import { ICoreApiResponse } from '../../common/api';
import { ICreateSupervisorPayload } from '../payloads/create-supervisor.payload';
import { IIndexSupervisorsByPayload } from '../payloads/index-supervisors.payload';
import { IUpdateSupervisorPayload } from '../payloads/update-supervisor.payload';
import { ISupervisor } from './supervisor.interface';

export interface ISupervisorsClient {
  indexSupervisors?(
    by?: IIndexSupervisorsByPayload,
  ): Promise<ICoreApiResponse<ISupervisor[]>>;
  getSupervisorById?(id: string): Promise<ICoreApiResponse<ISupervisor>>;
  getSupervisorByAccountId?(
    accountId: string,
  ): Promise<ICoreApiResponse<ISupervisor>>;
  createSupervisor?(
    payload: ICreateSupervisorPayload,
  ): Promise<ICoreApiResponse<ISupervisor>>;
  updateSupervisorById?(
    id: string,
    payload: IUpdateSupervisorPayload,
  ): Promise<ICoreApiResponse<ISupervisor>>;
  updateSupervisorByAccountId?(
    accountId: string,
    payload: IUpdateSupervisorPayload,
  ): Promise<ICoreApiResponse<ISupervisor>>;
  deleteSupervisorById?(id: string): Promise<ICoreApiResponse<null>>;
}
