import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SupervisorsPattern, SUPERVISORS_CLIENT } from '@sv-connect/common';
import {
  CoreApiException,
  ICoreApiResponse,
  ICreateSupervisorPayload,
  IIndexSupervisorsByPayload,
  ISupervisor,
  ISupervisorsClient,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SupervisorsService implements ISupervisorsClient {
  constructor(
    @Inject(SUPERVISORS_CLIENT) private readonly client: ClientProxy,
  ) {}

  async indexSupervisors(
    by: IIndexSupervisorsByPayload,
  ): Promise<ICoreApiResponse<ISupervisor[]>> {
    const [error, response] = await to<
      ICoreApiResponse<ISupervisor[]>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.client.send(SupervisorsPattern.INDEX_SUPERVISORS, { by }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return response;
  }

  async createSupervisor(
    payload: ICreateSupervisorPayload,
  ): Promise<ICoreApiResponse<ISupervisor>> {
    const [error, response] = await to<
      ICoreApiResponse<ISupervisor>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.client.send(SupervisorsPattern.CREATE_SUPERVISOR, {
          data: payload,
        }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return response;
  }
}
