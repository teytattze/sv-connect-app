import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  handleClientServiceError,
  SupervisorsPattern,
  SUPERVISORS_CLIENT,
} from '@sv-connect/common';
import {
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
  ): Promise<ISupervisor[]> {
    const [error, result] = await to(
      firstValueFrom(
        this.client.send(SupervisorsPattern.INDEX_SUPERVISORS, { by }),
      ),
    );
    if (error) handleClientServiceError(error);
    return result;
  }

  async createSupervisor(
    payload: ICreateSupervisorPayload,
  ): Promise<ISupervisor> {
    const [error, result] = await to(
      firstValueFrom(
        this.client.send(SupervisorsPattern.CREATE_SUPERVISOR, {
          data: payload,
        }),
      ),
    );
    if (error) handleClientServiceError(error);
    return result;
  }
}
