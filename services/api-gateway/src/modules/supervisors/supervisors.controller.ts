import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CoreApiResponse,
  CreateSupervisorBody,
  IndexSupervisorsQuery,
  SupervisorDto,
} from '@sv-connect/domain';
import { SupervisorsService } from './supervisors.service';

@ApiTags('Supervisors')
@Controller('supervisors')
export class SupervisorsController {
  constructor(private readonly supervisorsService: SupervisorsService) {}

  @Get()
  async indexSupervisors(
    @Query() query: IndexSupervisorsQuery,
  ): Promise<CoreApiResponse<SupervisorDto[]>> {
    const { data } = await this.supervisorsService.indexSupervisors(query);
    return CoreApiResponse.success(data);
  }

  @Post('create')
  async createSupervisor(
    @Body() body: CreateSupervisorBody,
  ): Promise<CoreApiResponse<SupervisorDto>> {
    const { data } = await this.supervisorsService.createSupervisor(body);
    return CoreApiResponse.success(data);
  }
}
