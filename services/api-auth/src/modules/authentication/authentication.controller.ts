import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthPattern } from '@sv-connect/common';
import {
  CoreApiResponse,
  IAuthClient,
  IAuthTokens,
  ICoreApiResponse,
  ILoginPayload,
  IRefreshAccessPayload,
} from '@sv-connect/domain';
import { AuthenticationService } from './authentication.service';

@Controller()
export class AuthenticationController implements IAuthClient {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @MessagePattern(AuthPattern.LOGIN)
  async login(
    @Payload('data') payload: ILoginPayload,
  ): Promise<ICoreApiResponse<IAuthTokens>> {
    const tokens = await this.authenticationService.login(payload);
    return CoreApiResponse.success(tokens);
  }

  @MessagePattern(AuthPattern.LOGOUT)
  async logout(
    @Payload('accountId') accountId: string,
  ): Promise<ICoreApiResponse<null>> {
    await this.authenticationService.logout(accountId);
    return CoreApiResponse.success(null, 'Logout successful');
  }

  @MessagePattern(AuthPattern.REFRESH_ACCESS)
  async refreshAccess(
    @Payload('data') payload: IRefreshAccessPayload,
  ): Promise<ICoreApiResponse<IAuthTokens>> {
    const tokens = await this.authenticationService.refreshAccess(payload);
    return CoreApiResponse.success(tokens);
  }
}
