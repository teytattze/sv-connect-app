import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FIELDS_CLIENT, FieldsPattern } from '@sv-connect/common';
import {
  IField,
  ICreateFieldPayload,
  IUpdateFieldPayload,
  IFieldsClient,
  ICoreServiceResponse,
  CoreHttpException,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FieldsService implements IFieldsClient {
  constructor(
    @Inject(FIELDS_CLIENT) private readonly fieldsClient: ClientProxy,
  ) {}

  async indexFields(): Promise<ICoreServiceResponse<IField[]>> {
    const [error, response] = await to<
      ICoreServiceResponse<IField[]>,
      ICoreServiceResponse<null>
    >(firstValueFrom(this.fieldsClient.send(FieldsPattern.INDEX_FIELDS, {})));
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async getFieldById(id: string): Promise<ICoreServiceResponse<IField>> {
    const [error, response] = await to<
      ICoreServiceResponse<IField>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.fieldsClient.send(FieldsPattern.GET_FIELD_BY_ID, { id }),
      ),
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async createField(
    payload: ICreateFieldPayload,
  ): Promise<ICoreServiceResponse<IField>> {
    const [error, response] = await to<
      ICoreServiceResponse<IField>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.fieldsClient.send(FieldsPattern.CREATE_FIELD, { data: payload }),
      ),
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async updateFieldById(
    id: string,
    payload: IUpdateFieldPayload,
  ): Promise<ICoreServiceResponse<IField>> {
    const [error, response] = await to<
      ICoreServiceResponse<IField>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.fieldsClient.send(FieldsPattern.UPDATE_FIELD_BY_ID, {
          id,
          data: payload,
        }),
      ),
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async deleteFieldById(id: string): Promise<ICoreServiceResponse<null>> {
    const [error, response] = await to<
      ICoreServiceResponse<null>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.fieldsClient.send(FieldsPattern.DELETE_FIELD_BY_ID, { id }),
      ),
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }
}
