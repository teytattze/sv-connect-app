import { Injectable } from '@nestjs/common';
import { InvitationsRepository } from './invitations.repository';
import {
  ICreateInvitationPayload,
  IInvitation,
  InvitationStatus,
} from '@sv-connect/domain';

@Injectable()
export class InvitationsService {
  constructor(private readonly invitationsRepository: InvitationsRepository) {}

  async createInvitation(
    payload: ICreateInvitationPayload,
  ): Promise<IInvitation> {
    return await this.invitationsRepository.createInvitation(payload);
  }

  async acceptInvitationById(id: string): Promise<IInvitation> {
    return await this.invitationsRepository.updateInvitation(
      { id },
      { status: InvitationStatus.ACCEPTED },
    );
  }

  async rejectInvitationById(id: string): Promise<IInvitation> {
    return await this.invitationsRepository.updateInvitation(
      { id },
      { status: InvitationStatus.REJECTED },
    );
  }
}
