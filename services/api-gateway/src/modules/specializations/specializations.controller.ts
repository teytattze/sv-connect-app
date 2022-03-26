import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CoreApiResponse,
  CreateSpecializationBody,
  DeleteSpecializationByIdParam,
  GetSpecializationByIdParam,
  SpecializationDto,
  UpdateSpecializationBody,
  UpdateSpecializationByIdParam,
} from '@sv-connect/domain';
import { SpecializationsService } from './specializations.service';

@ApiTags('Specializations')
@Controller('specializations')
export class SpecializationsController {
  constructor(
    private readonly specializationsService: SpecializationsService,
  ) {}

  @Get()
  async indexSpecializations(): Promise<CoreApiResponse<SpecializationDto[]>> {
    const { data } = await this.specializationsService.indexSpecializations();
    return CoreApiResponse.success(
      data,
      'Specializations retrieved successfully',
    );
  }

  @Post('create')
  async createSpecialization(
    @Body() body: CreateSpecializationBody,
  ): Promise<CoreApiResponse<SpecializationDto>> {
    const { data } = await this.specializationsService.createSpecialization(
      body,
    );
    return CoreApiResponse.success(data, 'Specialization created successfully');
  }

  @Get(':id')
  async getSpecializationById(
    @Param() { id }: GetSpecializationByIdParam,
  ): Promise<CoreApiResponse<SpecializationDto>> {
    const { data } = await this.specializationsService.getSpecializationById(
      id,
    );
    return CoreApiResponse.success(
      data,
      'Specialization retrieved successfully',
    );
  }

  @Put('update/:id')
  async updateSpecializationById(
    @Param() { id }: UpdateSpecializationByIdParam,
    @Body() body: UpdateSpecializationBody,
  ): Promise<CoreApiResponse<SpecializationDto>> {
    const { data } = await this.specializationsService.updateSpecializationById(
      id,
      body,
    );
    return CoreApiResponse.success(data, 'Specialization updated successfully');
  }

  @Delete('delete/:id')
  async deleteSpecializationById(
    @Param() { id }: DeleteSpecializationByIdParam,
  ): Promise<CoreApiResponse<null>> {
    const { data } = await this.specializationsService.deleteSpecializationById(
      id,
    );
    return CoreApiResponse.success(data, 'Specialization deleted successfully');
  }
}
