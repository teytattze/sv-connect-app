import { Controller } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InvitationsPattern } from '@sv-connect/common';
import {
  CoreApiResponse,
  ICoreApiResponse,
  ICreateInvitationPayload,
  IInvitation,
  IInvitationsClient,
} from '@sv-connect/domain';

@Controller()
export class InvitationsController implements IInvitationsClient {
  constructor(private readonly invitationsService: InvitationsService) {}

  @MessagePattern(InvitationsPattern.CREATE_INVITATION)
  async createInvitation(
    @Payload('data') payload: ICreateInvitationPayload,
  ): Promise<ICoreApiResponse<IInvitation>> {
    const invitation = await this.invitationsService.createInvitation(payload);
    return CoreApiResponse.success(invitation);
  }

  @MessagePattern(InvitationsPattern.ACCEPT_INVITATION_BY_ID)
  async acceptInvitationById(
    @Payload('id') id: string,
  ): Promise<ICoreApiResponse<IInvitation>> {
    const invitation = await this.invitationsService.acceptInvitationById(id);
    return CoreApiResponse.success(invitation);
  }

  @MessagePattern(InvitationsPattern.REJECT_INVITATION_BY_ID)
  async rejectInvitationById(
    @Payload('id') id: string,
  ): Promise<ICoreApiResponse<IInvitation>> {
    const invitation = await this.invitationsService.rejectInvitationById(id);
    return CoreApiResponse.success(invitation);
  }
}
