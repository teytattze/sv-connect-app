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
  CreateFieldBody,
  DeleteFieldByIdParam,
  FieldDto,
  GetFieldByIdParam,
  UpdateFieldBody,
  UpdateFieldByIdParam,
} from '@sv-connect/domain';
import { FieldsService } from './fields.service';

@ApiTags('Fields')
@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Get()
  async indexFields(): Promise<CoreApiResponse<FieldDto[]>> {
    const { data } = await this.fieldsService.indexFields();
    return CoreApiResponse.success(data, ' Fields retrieved successfully');
  }

  @Post('create')
  async createField(
    @Body() body: CreateFieldBody,
  ): Promise<CoreApiResponse<FieldDto>> {
    const { data } = await this.fieldsService.createField(body);
    return CoreApiResponse.success(data, 'Field created successfully');
  }

  @Get(':id')
  async getFieldById(
    @Param() { id }: GetFieldByIdParam,
  ): Promise<CoreApiResponse<FieldDto>> {
    const { data } = await this.fieldsService.getFieldById(id);
    return CoreApiResponse.success(data, 'Field retrieved successfully');
  }

  @Put('update/:id')
  async updateFieldById(
    @Param() { id }: UpdateFieldByIdParam,
    @Body() body: UpdateFieldBody,
  ): Promise<CoreApiResponse<FieldDto>> {
    const { data } = await this.fieldsService.updateFieldById(id, body);
    return CoreApiResponse.success(data, 'Field updated successfully');
  }

  @Delete('delete/:id')
  async deleteFieldById(
    @Param() { id }: DeleteFieldByIdParam,
  ): Promise<CoreApiResponse<null>> {
    const { data } = await this.fieldsService.deleteFieldById(id);
    return CoreApiResponse.success(data, 'Field deleted successfully');
  }
}
