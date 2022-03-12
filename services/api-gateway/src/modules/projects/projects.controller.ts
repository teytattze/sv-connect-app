import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  CreateProjectBody,
  GetProjectByIdParam,
  ProjectDto,
  UpdateProjectBody,
  UpdateProjectByIdParam,
} from '@sv-connect/domain';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('create')
  async createProject(@Body() body: CreateProjectBody): Promise<ProjectDto> {
    return await this.projectsService.createProject(body);
  }

  @Get(':id')
  async getProjectById(
    @Param() param: GetProjectByIdParam,
  ): Promise<ProjectDto> {
    return await this.projectsService.getProjectById(param.id);
  }

  @Put('update/:id')
  async updateProjectById(
    @Param() param: UpdateProjectByIdParam,
    @Body() body: UpdateProjectBody,
  ): Promise<ProjectDto> {
    return await this.projectsService.updateProjectById(param.id, body);
  }
}
