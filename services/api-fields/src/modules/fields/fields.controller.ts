import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FieldsPattern } from '@sv-connect/common';
import {
  IFieldsClient,
  ICreateFieldPayload,
  IField,
  IUpdateFieldPayload,
  ICoreApiResponse,
  CoreApiResponse,
} from '@sv-connect/domain';
import { FieldsService } from './fields.service';

@Controller()
export class FieldsController implements IFieldsClient {
  constructor(private readonly fieldsService: FieldsService) {}

  @MessagePattern(FieldsPattern.INDEX_FIELDS)
  async indexFields(): Promise<ICoreApiResponse<IField[]>> {
    const fields = await this.fieldsService.indexFields();
    return CoreApiResponse.success(fields);
  }

  @MessagePattern(FieldsPattern.GET_FIELD_BY_ID)
  async getFieldById(
    @Payload('id') id: string,
  ): Promise<ICoreApiResponse<IField>> {
    const field = await this.fieldsService.getFieldById(id);
    return CoreApiResponse.success(field);
  }

  @MessagePattern(FieldsPattern.CREATE_FIELD)
  async createField(
    @Payload('data') payload: ICreateFieldPayload,
  ): Promise<ICoreApiResponse<IField>> {
    const field = await this.fieldsService.createField(payload);
    return CoreApiResponse.success(field);
  }

  @MessagePattern(FieldsPattern.UPDATE_FIELD_BY_ID)
  async updateFieldById(
    @Payload('id') id: string,
    @Payload('data') payload: IUpdateFieldPayload,
  ): Promise<ICoreApiResponse<IField>> {
    const field = await this.fieldsService.updateFieldById(id, payload);
    return CoreApiResponse.success(field);
  }

  @MessagePattern(FieldsPattern.DELETE_FIELD_BY_ID)
  async deleteFieldById(
    @Payload('id') id: string,
  ): Promise<ICoreApiResponse<null>> {
    await this.fieldsService.deleteFieldById(id);
    return CoreApiResponse.success(null, 'Field deleted successfully');
  }
}
