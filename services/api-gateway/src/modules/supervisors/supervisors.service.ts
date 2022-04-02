import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SupervisorsPattern, SUPERVISORS_CLIENT } from '@sv-connect/common';
import {
  CoreHttpException,
  ICoreServiceResponse,
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
  ): Promise<ICoreServiceResponse<ISupervisor[]>> {
    const [error, response] = await to<
      ICoreServiceResponse<ISupervisor[]>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(SupervisorsPattern.INDEX_SUPERVISORS, { by }),
      ),
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async createSupervisor(
    payload: ICreateSupervisorPayload,
  ): Promise<ICoreServiceResponse<ISupervisor>> {
    const [error, response] = await to<
      ICoreServiceResponse<ISupervisor>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(SupervisorsPattern.CREATE_SUPERVISOR, {
          data: payload,
        }),
      ),
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }
}
