import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FIELDS_CLIENT, FieldsPattern } from '@sv-connect/common';
import {
  IField,
  ICreateFieldPayload,
  IUpdateFieldPayload,
  IFieldsClient,
  ICoreApiResponse,
  CoreApiException,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FieldsService implements IFieldsClient {
  constructor(
    @Inject(FIELDS_CLIENT) private readonly fieldsClient: ClientProxy,
  ) {}

  async indexFields(): Promise<ICoreApiResponse<IField[]>> {
    const [error, response] = await to<
      ICoreApiResponse<IField[]>,
      ICoreApiResponse<null>
    >(firstValueFrom(this.fieldsClient.send(FieldsPattern.INDEX_FIELDS, {})));
    if (error) throw CoreApiException.new(error);
    return response;
  }

  async getFieldById(id: string): Promise<ICoreApiResponse<IField>> {
    const [error, response] = await to<
      ICoreApiResponse<IField>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.fieldsClient.send(FieldsPattern.GET_FIELD_BY_ID, { id }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return response;
  }

  async createField(
    payload: ICreateFieldPayload,
  ): Promise<ICoreApiResponse<IField>> {
    const [error, response] = await to<
      ICoreApiResponse<IField>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.fieldsClient.send(FieldsPattern.CREATE_FIELD, { data: payload }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return response;
  }

  async updateFieldById(
    id: string,
    payload: IUpdateFieldPayload,
  ): Promise<ICoreApiResponse<IField>> {
    const [error, response] = await to<
      ICoreApiResponse<IField>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.fieldsClient.send(FieldsPattern.UPDATE_FIELD_BY_ID, {
          id,
          data: payload,
        }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return response;
  }

  async deleteFieldById(id: string): Promise<ICoreApiResponse<null>> {
    const [error, response] = await to<
      ICoreApiResponse<null>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.fieldsClient.send(FieldsPattern.DELETE_FIELD_BY_ID, { id }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return response;
  }
}
