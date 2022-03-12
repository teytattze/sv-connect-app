import { Injectable } from '@nestjs/common';
import {
  ICreateProjectPayload,
  IProject,
  IUpdateProjectPayload,
} from '@sv-connect/domain';
import { ProjectsRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async getProjectById(id: string): Promise<IProject> {
    return await this.projectsRepository.findProject({ id });
  }

  async getProjectByStudentId(studentId: string): Promise<IProject> {
    return await this.projectsRepository.findProject({ studentId });
  }

  async createProject(payload: ICreateProjectPayload): Promise<IProject> {
    return await this.projectsRepository.createProject(payload);
  }

  async updateProjectById(
    id: string,
    payload: IUpdateProjectPayload,
  ): Promise<IProject> {
    return await this.projectsRepository.updateProject({ id }, payload);
  }
}
