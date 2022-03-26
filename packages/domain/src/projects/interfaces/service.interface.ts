import { ICreateProjectPayload } from '../payloads/create-project.payload';
import { IUpdateProjectPayload } from '../payloads/update-project.payload';
import { IProject } from './project.interface';

export interface IProjectsService {
  indexProjects(id: string): Promise<IProject[]>;
  getProjectById(id: string): Promise<IProject>;
  getProjectByStudentId(studentId: string): Promise<IProject>;
  createProject(payload: ICreateProjectPayload): Promise<IProject>;
  updateProjectById(
    id: string,
    payload: IUpdateProjectPayload,
  ): Promise<IProject>;
  deleteProjectById(id: string): Promise<void>;
}
