import {
  ICreateProjectPayload,
  IUpdateProjectPayload,
} from '../payloads/projects.payload';
import { IField } from './fields.interface';
import { ISpecialization } from './specializations.interface';

export interface IProject {
  id: string;
  title: string;
  summary: string;
  studentId: string;
  field: IField;
  specializations: ISpecialization[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IProjectsService {
  getProjectByStudentId(studentId: string): Promise<IProject>;
  createProject(payload: ICreateProjectPayload): Promise<IProject>;
  updateProjectById(
    id: string,
    payload: IUpdateProjectPayload,
  ): Promise<IProject>;
}

export interface IProjectsClient extends Partial<IProjectsService> {}
