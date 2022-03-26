export { CreateProjectBody } from './dtos/create-project.dto';
export { DeleteProjectByIdParam } from './dtos/delete-project.dto';
export {
  GetProjectByIdParam,
  GetProjectByStudentIdParam,
} from './dtos/get-project.dto';
export { ProjectDto } from './dtos/project.dto';
export {
  UpdateProjectBody,
  UpdateProjectByIdParam,
} from './dtos/update-project.dto';

export { ProjectEntity } from './entities/project.entity';

export type { IProjectsClient } from './interfaces/client.interface';
export type { IProject } from './interfaces/project.interface';
export type { IProjectsService } from './interfaces/service.interface';

export type { ICreateProjectPayload } from './payloads/create-project.payload';
export type { IUpdateProjectPayload } from './payloads/update-project.payload';
