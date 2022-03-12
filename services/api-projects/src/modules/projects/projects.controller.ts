import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProjectsPattern } from '@sv-connect/common';
import {
  ICreateProjectPayload,
  IProject,
  IProjectsClient,
  IUpdateProjectPayload,
} from '@sv-connect/domain';
import { ProjectsService } from './projects.service';

@Controller()
export class ProjectsController implements IProjectsClient {
  constructor(private readonly projectsService: ProjectsService) {}

  @MessagePattern(ProjectsPattern.GET_PROJECT_BY_ID)
  async getProjectById(@Payload('id') id: string): Promise<IProject> {
    return await this.projectsService.getProjectById(id);
  }

  @MessagePattern(ProjectsPattern.GET_PROJECT_BY_STUDENT_ID)
  async getProjectByStudentId(
    @Payload('studentId') studentId: string,
  ): Promise<IProject> {
    return await this.projectsService.getProjectByStudentId(studentId);
  }

  @MessagePattern(ProjectsPattern.CREATE_PROJECT)
  async createProject(
    @Payload('data') payload: ICreateProjectPayload,
  ): Promise<IProject> {
    return await this.projectsService.createProject(payload);
  }

  @MessagePattern(ProjectsPattern.UPDATE_PROJECT_BY_ID)
  async updateProjectById(
    @Payload('id') id: string,
    @Payload('data') data: IUpdateProjectPayload,
  ): Promise<IProject> {
    return await this.projectsService.updateProjectById(id, data);
  }
}
