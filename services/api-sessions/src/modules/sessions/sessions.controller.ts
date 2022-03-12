import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SessionsPattern } from '@sv-connect/common';
import {
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
  ): Promise<ISession> {
    return await this.sessionsService.getSessionByAccountId(accountId);
  }

  @MessagePattern(SessionsPattern.CREATE_SESSION)
  async registerSession(
    @Payload('data') payload: ICreateSessionPayload,
  ): Promise<ISession> {
    return await this.sessionsService.registerSession(payload);
  }

  @MessagePattern(SessionsPattern.INITIALIZE_SESSION)
  async initializeSessionByAccountId(
    @Payload('accountId') accountId: string,
  ): Promise<ISession> {
    return await this.sessionsService.initializeSession(accountId);
  }

  @MessagePattern(SessionsPattern.INVALIDATE_SESSION)
  async invalidateSessionByAccountId(
    @Payload('accountId') accountId: string,
  ): Promise<ISession> {
    return await this.sessionsService.invalidateSession(accountId);
  }
}
