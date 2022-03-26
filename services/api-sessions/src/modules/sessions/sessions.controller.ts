import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SessionsPattern } from '@sv-connect/common';
import {
  CoreApiResponse,
  ICoreApiResponse,
  ICreateSessionPayload,
  ISession,
  ISessionsClient,
} from '@sv-connect/domain';
import { SessionsService } from './sessions.service';

@Controller()
export class SessionsController implements ISessionsClient {
  constructor(private readonly sessionsService: SessionsService) {}

  @MessagePattern(SessionsPattern.GET_SESSION_BY_ACCOUNT_ID)
  async getSessionByAccountId(
    @Payload('accountId') accountId: string,
  ): Promise<ICoreApiResponse<ISession>> {
    const session = await this.sessionsService.getSessionByAccountId(accountId);
    return CoreApiResponse.success(session);
  }

  @MessagePattern(SessionsPattern.CREATE_SESSION)
  async registerSession(
    @Payload('data') payload: ICreateSessionPayload,
  ): Promise<ICoreApiResponse<ISession>> {
    const session = await this.sessionsService.createSession(payload);
    return CoreApiResponse.success(session);
  }

  @MessagePattern(SessionsPattern.INITIALIZE_SESSION_BY_ACCOUNT_ID)
  async initializeSessionByAccountId(
    @Payload('accountId') accountId: string,
  ): Promise<ICoreApiResponse<ISession>> {
    const session = await this.sessionsService.initializeSessionByAccountId(
      accountId,
    );
    return CoreApiResponse.success(session);
  }

  @MessagePattern(SessionsPattern.INVALIDATE_SESSION_BY_ACCOUNT_ID)
  async invalidateSessionByAccountId(
    @Payload('accountId') accountId: string,
  ): Promise<ICoreApiResponse<ISession>> {
    const session = await this.sessionsService.invalidateSessionByAccountId(
      accountId,
    );
    return CoreApiResponse.success(session);
  }
}
