import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProjectsPattern } from '@sv-connect/common';
import {
  CoreServiceResponse,
  ICreateProjectPayload,
  IProject,
  IProjectsClient,
  IUpdateProjectPayload,
} from '@sv-connect/domain';
import { ProjectsService } from './projects.service';

@Controller()
export class ProjectsController implements IProjectsClient {
  constructor(private readonly projectsService: ProjectsService) {}

  @MessagePattern(ProjectsPattern.INDEX_PROJECTS)
  async indexProjects(): Promise<CoreServiceResponse<IProject[]>> {
    const projects = await this.projectsService.indexProjects();
    return CoreServiceResponse.success({ data: projects });
  }

  @MessagePattern(ProjectsPattern.GET_PROJECT_BY_ID)
  async getProjectById(
    @Payload('id') id: string,
  ): Promise<CoreServiceResponse<IProject>> {
    const project = await this.projectsService.getProjectById(id);
    return CoreServiceResponse.success({ data: project });
  }

  @MessagePattern(ProjectsPattern.GET_PROJECT_BY_STUDENT_ID)
  async getProjectByStudentId(
    @Payload('studentId') studentId: string,
  ): Promise<CoreServiceResponse<IProject>> {
    const project = await this.projectsService.getProjectByStudentId(studentId);
    return CoreServiceResponse.success({ data: project });
  }

  @MessagePattern(ProjectsPattern.CREATE_PROJECT)
  async createProject(
    @Payload('data') payload: ICreateProjectPayload,
  ): Promise<CoreServiceResponse<IProject>> {
    const project = await this.projectsService.createProject(payload);
    return CoreServiceResponse.success({ data: project });
  }

  @MessagePattern(ProjectsPattern.UPDATE_PROJECT_BY_ID)
  async updateProjectById(
    @Payload('id') id: string,
    @Payload('data') data: IUpdateProjectPayload,
  ): Promise<CoreServiceResponse<IProject>> {
    const project = await this.projectsService.updateProjectById(id, data);
    return CoreServiceResponse.success({ data: project });
  }

  @MessagePattern(ProjectsPattern.DELETE_PROJECT_BY_ID)
  async deleteProjectById(
    @Payload('id') id: string,
  ): Promise<CoreServiceResponse<null>> {
    await this.projectsService.deleteProjectById(id);
    return CoreServiceResponse.success({
      message: 'Project deleted successfully',
    });
  }
}
