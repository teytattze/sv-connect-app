import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  ICreateProjectPayload,
  IProject,
  IProjectsService,
  IUpdateProjectPayload,
  ProjectsCode,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { handlePrismaError } from './projects.helper';
import { ProjectsRepository } from './projects.repository';

@Injectable()
export class ProjectsService implements IProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async indexProjects(): Promise<IProject[]> {
    const [error, projects] = await to<IProject[], any>(
      this.projectsRepository.findProjects(),
    );
    if (error) handlePrismaError(error);
    return projects;
  }

  async getProjectById(id: string): Promise<IProject> {
    const [error, project] = await to<IProject, any>(
      this.projectsRepository.findProject({ id }),
    );
    if (error) handlePrismaError(error);
    if (!project) throw new RpcException(ProjectsCode.PROJECT_NOT_FOUND);
    return project;
  }

  async getProjectByStudentId(studentId: string): Promise<IProject> {
    const [error, project] = await to<IProject, any>(
      this.projectsRepository.findProject({ studentId }),
    );
    if (error) handlePrismaError(error);
    if (!project) throw new RpcException(ProjectsCode.PROJECT_NOT_FOUND);
    return project;
  }

  async createProject(payload: ICreateProjectPayload): Promise<IProject> {
    const [error, project] = await to<IProject, any>(
      this.projectsRepository.createProject(payload),
    );
    if (error) handlePrismaError(error);
    return project;
  }

  async updateProjectById(
    id: string,
    payload: IUpdateProjectPayload,
  ): Promise<IProject> {
    const [error, project] = await to<IProject, any>(
      this.projectsRepository.updateProject({ id }, payload),
    );
    if (error) handlePrismaError(error);
    return project;
  }

  async deleteProjectById(id: string): Promise<void> {
    const [error] = await to<void, any>(
      this.projectsRepository.deleteProject({ id }),
    );
    if (error) handlePrismaError(error);
  }
}
