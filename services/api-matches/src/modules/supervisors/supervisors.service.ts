import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { SupervisorsPattern, SUPERVISORS_CLIENT } from '@sv-connect/common';
import {
  ICoreApiResponse,
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

  async indexSupervisor(
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
    if (error) throw new RpcException(error);
    return response;
  }

  async getSupervisorById(id: string): Promise<ICoreApiResponse<ISupervisor>> {
    const [error, response] = await to<
      ICoreApiResponse<ISupervisor>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.client.send(SupervisorsPattern.GET_SUPERVISOR_BY_ID, { id }),
      ),
    );
    if (error) throw new RpcException(error);
    return response;
  }
}
