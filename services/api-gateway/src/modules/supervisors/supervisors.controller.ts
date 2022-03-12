import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  CreateSupervisorBody,
  IndexSupervisorsQuery,
  SupervisorDto,
} from '@sv-connect/domain';
import { SupervisorsService } from './supervisors.service';

@Controller('supervisors')
export class SupervisorsController {
  constructor(private readonly supervisorsService: SupervisorsService) {}

  @Get()
  async indexSupervisors(
    @Query() query: IndexSupervisorsQuery,
  ): Promise<SupervisorDto[]> {
    return await this.supervisorsService.indexSupervisors(query);
  }

  @Post('create')
  async createSupervisor(
    @Body() body: CreateSupervisorBody,
  ): Promise<SupervisorDto> {
    return await this.supervisorsService.createSupervisor(body);
  }
}
