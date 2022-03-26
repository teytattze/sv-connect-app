import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SESSIONS_CLIENT, SessionsPattern } from '@sv-connect/common';
import {
  CoreApiException,
  ICoreApiResponse,
  ICreateSessionPayload,
  ISession,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SessionsService {
  constructor(@Inject(SESSIONS_CLIENT) private readonly client: ClientProxy) {}

  async createSession(
    payload: ICreateSessionPayload,
  ): Promise<ICoreApiResponse<ISession>> {
    const [error, sessionRes] = await to<
      ICoreApiResponse<ISession>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.client.send(SessionsPattern.CREATE_SESSION, { data: payload }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return sessionRes;
  }
}
