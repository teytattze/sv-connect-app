import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthPattern } from '@sv-connect/common';
import {
  IAuthClient,
  ILoginPayload,
  IRefreshAccessPayload,
} from '@sv-connect/domain';
import { AuthenticationService } from './authentication.service';

@Controller()
export class AuthenticationController implements IAuthClient {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @MessagePattern(AuthPattern.LOGIN)
  async login(@Payload('data') payload: ILoginPayload) {
    return await this.authenticationService.login(payload);
  }

  @MessagePattern(AuthPattern.LOGOUT)
  async logout(@Payload('accountId') accountId: string) {
    this.authenticationService.logout(accountId);
  }

  @MessagePattern(AuthPattern.REFRESH_ACCESS)
  async refreshAccess(@Payload('data') payload: IRefreshAccessPayload) {
    return await this.authenticationService.refreshAccess(payload);
  }
}
