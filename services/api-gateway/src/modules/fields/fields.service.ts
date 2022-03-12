import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  handleClientServiceError,
  FIELDS_CLIENT,
  FieldsPattern,
} from '@sv-connect/common';
import { IField, IFieldsClient, ICreateFieldPayload } from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FieldsService implements IFieldsClient {
  constructor(
    @Inject(FIELDS_CLIENT) private readonly fieldsClient: ClientProxy,
  ) {}

  async createField(payload: ICreateFieldPayload): Promise<IField> {
    const [err, field] = await to(
      firstValueFrom(
        this.fieldsClient.send(FieldsPattern.CREATE_FIELD, { data: payload }),
      ),
    );
    if (err) handleClientServiceError(err);
    return field;
  }
}
