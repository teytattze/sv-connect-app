import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  AcceptInvitationByIdParam,
  CoreApiResponse,
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
  ): Promise<CoreApiResponse<InvitationDto>> {
    const { data } = await this.invitationsService.createInvitation(body);
    return CoreApiResponse.success(data);
  }

  @Put('accept/:id')
  async acceptInvitation(
    @Param() { id }: AcceptInvitationByIdParam,
  ): Promise<CoreApiResponse<InvitationDto>> {
    const { data } = await this.invitationsService.acceptInvitationById(id);
    return CoreApiResponse.success(data);
  }

  @Put('reject/:id')
  async rejectInvitation(
    @Param() { id }: RejectInvitationByIdParam,
  ): Promise<CoreApiResponse<InvitationDto>> {
    const { data } = await this.invitationsService.rejectInvitationById(id);
    return CoreApiResponse.success(data);
  }
}
