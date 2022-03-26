import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CoreApiResponse,
  CreateProjectBody,
  GetProjectByIdParam,
  ProjectDto,
  UpdateProjectBody,
  UpdateProjectByIdParam,
} from '@sv-connect/domain';
import { ProjectsService } from './projects.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('create')
  async createProject(
    @Body() body: CreateProjectBody,
  ): Promise<CoreApiResponse<ProjectDto>> {
    const { data } = await this.projectsService.createProject(body);
    return CoreApiResponse.success(data);
  }

  @Get(':id')
  async getProjectById(
    @Param() { id }: GetProjectByIdParam,
  ): Promise<CoreApiResponse<ProjectDto>> {
    const { data } = await this.projectsService.getProjectById(id);
    return CoreApiResponse.success(data);
  }

  @Put('update/:id')
  async updateProjectById(
    @Param() { id }: UpdateProjectByIdParam,
    @Body() body: UpdateProjectBody,
  ): Promise<CoreApiResponse<ProjectDto>> {
    const { data } = await this.projectsService.updateProjectById(id, body);
    return CoreApiResponse.success(data);
  }
}
