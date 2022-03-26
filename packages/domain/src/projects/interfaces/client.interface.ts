import { ICoreApiResponse } from '../../common/api';
import { ICreateProjectPayload } from '../payloads/create-project.payload';
import { IUpdateProjectPayload } from '../payloads/update-project.payload';
import { IProject } from './project.interface';

export interface IProjectsClient {
  indexProjects?(id: string): Promise<ICoreApiResponse<IProject[]>>;
  getProjectById?(id: string): Promise<ICoreApiResponse<IProject>>;
  getProjectByStudentId?(
    studentId: string,
  ): Promise<ICoreApiResponse<IProject>>;
  createProject?(
    payload: ICreateProjectPayload,
  ): Promise<ICoreApiResponse<IProject>>;
  updateProjectById?(
    id: string,
    payload: IUpdateProjectPayload,
  ): Promise<ICoreApiResponse<IProject>>;
  deleteProjectById?(id: string): Promise<ICoreApiResponse<null>>;
}
