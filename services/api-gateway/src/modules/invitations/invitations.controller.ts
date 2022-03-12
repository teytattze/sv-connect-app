import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import {
  AcceptInvitationParam,
  CreateInvitationBody,
  RejectInvitationParam,
} from '@sv-connect/domain';
import { InvitationsService } from './invitations.service';

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post('create')
  async createInvitation(@Body() body: CreateInvitationBody) {
    return await this.invitationsService.createInvitation(body);
  }

  @Put('accept/:id')
  async acceptInvitation(@Param() param: AcceptInvitationParam) {
    return await this.invitationsService.acceptInvitation(param.id);
  }

  @Put('reject/:id')
  async rejectInvitation(@Param() param: RejectInvitationParam) {
    return await this.invitationsService.rejectInvitation(param.id);
  }
}
