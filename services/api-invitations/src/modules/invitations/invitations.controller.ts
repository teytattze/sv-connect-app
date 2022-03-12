import { Controller } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InvitationsPattern } from '@sv-connect/common';
import {
  ICreateInvitationPayload,
  IInvitationsClient,
} from '@sv-connect/domain';

@Controller()
export class InvitationsController implements IInvitationsClient {
  constructor(private readonly invitationsService: InvitationsService) {}

  @MessagePattern(InvitationsPattern.CREATE_INVITATION)
  async createInvitation(@Payload('data') payload: ICreateInvitationPayload) {
    return await this.invitationsService.createInvitation(payload);
  }

  @MessagePattern(InvitationsPattern.ACCEPT_INVITATION)
  async acceptInvitationById(@Payload('id') id: string) {
    return await this.invitationsService.acceptInvitationById(id);
  }

  @MessagePattern(InvitationsPattern.REJECT_INVITATION)
  async rejectInvitationById(@Payload('id') id: string) {
    return await this.invitationsService.rejectInvitationById(id);
  }
}
