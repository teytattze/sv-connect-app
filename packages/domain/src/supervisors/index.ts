export { CreateSupervisorBody } from './dtos/create-supervisor.dto';
export { DeleteSupervisorByIdParam } from './dtos/delete-supervisor.dto';
export {
  GetSupervisorByAccountIdParam,
  GetSupervisorByIdParam,
} from './dtos/get-supervisor.dto';
export { IndexSupervisorsQuery } from './dtos/index-supervisors.dto';
export { SupervisorDto } from './dtos/supervisor.dto';
export {
  UpdateSupervisorBody,
  UpdateSupervisorByAccountIdParam,
  UpdateSupervisorByIdParam,
} from './dtos/update-supervisor.dto';

export { SupervisorEntity } from './entities/supervisor.entity';

export type { ISupervisorsClient } from './interfaces/client.interface';
export type { ISupervisorsService } from './interfaces/service.interface';
export type { ISupervisor } from './interfaces/supervisor.interface';

export type { ICreateSupervisorPayload } from './payloads/create-supervisor.payload';
export type { IIndexSupervisorsByPayload } from './payloads/index-supervisors.payload';
export type { IUpdateSupervisorPayload } from './payloads/update-supervisor.payload';
