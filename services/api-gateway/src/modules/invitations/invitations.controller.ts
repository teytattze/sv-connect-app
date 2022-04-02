import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  AcceptInvitationByIdParam,
  CoreHttpResponse,
  CreateInvitationBody,
  InvitationDto,
  RejectInvitationByIdParam,
} from '@sv-connect/domain';
import { InvitationsService } from './invitations.service';

@ApiTags('Invitations')
@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post('create')
  async createInvitation(
    @Body() body: CreateInvitationBody,
  ): Promise<CoreHttpResponse<InvitationDto>> {
    const { data } = await this.invitationsService.createInvitation(body);
    return CoreHttpResponse.success({ data });
  }

  @Put('accept/:id')
  async acceptInvitation(
    @Param() { id }: AcceptInvitationByIdParam,
  ): Promise<CoreHttpResponse<InvitationDto>> {
    const { data } = await this.invitationsService.acceptInvitationById(id);
    return CoreHttpResponse.success({ data });
  }

  @Put('reject/:id')
  async rejectInvitation(
    @Param() { id }: RejectInvitationByIdParam,
  ): Promise<CoreHttpResponse<InvitationDto>> {
    const { data } = await this.invitationsService.rejectInvitationById(id);
    return CoreHttpResponse.success({ data });
  }
}
