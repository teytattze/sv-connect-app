import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FieldsPattern } from '@sv-connect/common';
import {
  IFieldsClient,
  ICreateFieldPayload,
  IField,
  IUpdateFieldPayload,
  CoreServiceResponse,
} from '@sv-connect/domain';
import { FieldsService } from './fields.service';

@Controller()
export class FieldsController implements IFieldsClient {
  constructor(private readonly fieldsService: FieldsService) {}

  @MessagePattern(FieldsPattern.INDEX_FIELDS)
  async indexFields(): Promise<CoreServiceResponse<IField[]>> {
    const fields = await this.fieldsService.indexFields();
    return CoreServiceResponse.success({ data: fields });
  }

  @MessagePattern(FieldsPattern.GET_FIELD_BY_ID)
  async getFieldById(
    @Payload('id') id: string,
  ): Promise<CoreServiceResponse<IField>> {
    const field = await this.fieldsService.getFieldById(id);
    return CoreServiceResponse.success({ data: field });
  }

  @MessagePattern(FieldsPattern.CREATE_FIELD)
  async createField(
    @Payload('data') payload: ICreateFieldPayload,
  ): Promise<CoreServiceResponse<IField>> {
    const field = await this.fieldsService.createField(payload);
    return CoreServiceResponse.success({ data: field });
  }

  @MessagePattern(FieldsPattern.UPDATE_FIELD_BY_ID)
  async updateFieldById(
    @Payload('id') id: string,
    @Payload('data') payload: IUpdateFieldPayload,
  ): Promise<CoreServiceResponse<IField>> {
    const field = await this.fieldsService.updateFieldById(id, payload);
    return CoreServiceResponse.success({ data: field });
  }

  @MessagePattern(FieldsPattern.DELETE_FIELD_BY_ID)
  async deleteFieldById(
    @Payload('id') id: string,
  ): Promise<CoreServiceResponse<null>> {
    await this.fieldsService.deleteFieldById(id);
    return CoreServiceResponse.success({
      message: 'Field deleted successfully',
    });
  }
}
