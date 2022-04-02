import { ICoreServiceResponse } from '../../common';
import { ICreateProjectPayload } from '../payloads/create-project.payload';
import { IUpdateProjectPayload } from '../payloads/update-project.payload';
import { IProject } from './project.interface';

export interface IProjectsClient {
  indexProjects?(id: string): Promise<ICoreServiceResponse<IProject[]>>;
  getProjectById?(id: string): Promise<ICoreServiceResponse<IProject>>;
  getProjectByStudentId?(
    studentId: string,
  ): Promise<ICoreServiceResponse<IProject>>;
  createProject?(
    payload: ICreateProjectPayload,
  ): Promise<ICoreServiceResponse<IProject>>;
  updateProjectById?(
    id: string,
    payload: IUpdateProjectPayload,
  ): Promise<ICoreServiceResponse<IProject>>;
  deleteProjectById?(id: string): Promise<ICoreServiceResponse<null>>;
}
