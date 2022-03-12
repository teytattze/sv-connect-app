import { Injectable } from '@nestjs/common';
import { ICreateFieldPayload, IField } from '@sv-connect/domain';
import { FieldsRepository } from './fields.repository';

@Injectable()
export class FieldsService {
  constructor(private readonly fieldsRepository: FieldsRepository) {}

  async createField(payload: ICreateFieldPayload): Promise<IField> {
    return await this.fieldsRepository.createField(payload);
  }
}
