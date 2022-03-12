import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  handleClientServiceError,
  SPECIALIZATIONS_CLIENT,
  SpecializationsPattern,
} from '@sv-connect/common';
import {
  ICreateSpecializationPayload,
  ISpecialization,
  ISpecializationsClient,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SpecializationsService implements ISpecializationsClient {
  constructor(
    @Inject(SPECIALIZATIONS_CLIENT) private readonly client: ClientProxy,
  ) {}

  async createSpecialization(
    payload: ICreateSpecializationPayload,
  ): Promise<ISpecialization> {
    const [err, specialization] = await to(
      firstValueFrom(
        this.client.send(SpecializationsPattern.CREATE_SPECIALIZATION, {
          data: payload,
        }),
      ),
    );
    if (err) handleClientServiceError(err);
    return specialization;
  }
}
