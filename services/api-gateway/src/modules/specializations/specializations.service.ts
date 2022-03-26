import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  SPECIALIZATIONS_CLIENT,
  SpecializationsPattern,
} from '@sv-connect/common';
import {
  CoreApiException,
  ICoreApiResponse,
  ICreateSpecializationPayload,
  ISpecialization,
  ISpecializationsClient,
  IUpdateSpecializationPayload,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SpecializationsService implements ISpecializationsClient {
  constructor(
    @Inject(SPECIALIZATIONS_CLIENT) private readonly client: ClientProxy,
  ) {}

  async indexSpecializations(): Promise<ICoreApiResponse<ISpecialization[]>> {
    const [error, response] = await to<
      ICoreApiResponse<ISpecialization[]>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.client.send(SpecializationsPattern.INDEX_SPECIALIZATIONS, {}),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return response;
  }

  async getSpecializationById(
    id: string,
  ): Promise<ICoreApiResponse<ISpecialization>> {
    const [error, response] = await to<
      ICoreApiResponse<ISpecialization>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.client.send(SpecializationsPattern.GET_SPECIALIZATION_BY_ID, {
          id,
        }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return response;
  }

  async createSpecialization(
    payload: ICreateSpecializationPayload,
  ): Promise<ICoreApiResponse<ISpecialization>> {
    const [error, response] = await to<
      ICoreApiResponse<ISpecialization>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.client.send(SpecializationsPattern.CREATE_SPECIALIZATION, {
          data: payload,
        }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return response;
  }

  async updateSpecializationById(
    id: string,
    payload: IUpdateSpecializationPayload,
  ): Promise<ICoreApiResponse<ISpecialization>> {
    const [error, response] = await to<
      ICoreApiResponse<ISpecialization>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.client.send(SpecializationsPattern.UPDATE_SPECIALIZATION_BY_ID, {
          id,
          data: payload,
        }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return response;
  }

  async deleteSpecializationById(id: string): Promise<ICoreApiResponse<null>> {
    const [error, response] = await to<
      ICoreApiResponse<null>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.client.send(SpecializationsPattern.DELETE_SPECIALIZATION_BY_ID, {
          id,
        }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return response;
  }
}
