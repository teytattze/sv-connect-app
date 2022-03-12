import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FieldsPattern } from '@sv-connect/common';
import { IFieldsClient, ICreateFieldPayload, IField } from '@sv-connect/domain';
import { FieldsService } from './fields.service';

@Controller()
export class FieldsController implements IFieldsClient {
  constructor(private readonly fieldsService: FieldsService) {}

  @MessagePattern(FieldsPattern.CREATE_FIELD)
  async createField(
    @Payload('data') payload: ICreateFieldPayload,
  ): Promise<IField> {
    return await this.fieldsService.createField(payload);
  }
}
