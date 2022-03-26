import { Injectable } from '@nestjs/common';
import { InvitationsRepository } from './invitations.repository';
import {
  ICreateInvitationPayload,
  IInvitation,
  IInvitationsService,
} from '@sv-connect/domain';
import { InvitationStatus } from '@prisma/client';
import { handlePrismaError } from './invitations.helper';
import to from 'await-to-js';

@Injectable()
export class InvitationsService implements IInvitationsService {
  constructor(private readonly invitationsRepository: InvitationsRepository) {}

  async createInvitation(
    payload: ICreateInvitationPayload,
  ): Promise<IInvitation> {
    const [error, invitation] = await to<IInvitation, any>(
      this.invitationsRepository.createInvitation(payload),
    );
    if (error) handlePrismaError(error);
    return invitation;
  }

  async acceptInvitationById(id: string): Promise<IInvitation> {
    const [error, invitation] = await to<IInvitation, any>(
      this.invitationsRepository.updateInvitation(
        { id },
        { status: InvitationStatus.ACCEPTED },
      ),
    );
    if (error) handlePrismaError(error);
    return invitation;
  }

  async rejectInvitationById(id: string): Promise<IInvitation> {
    const [error, invitation] = await to<IInvitation, any>(
      this.invitationsRepository.updateInvitation(
        { id },
        { status: InvitationStatus.REJECTED },
      ),
    );
    if (error) handlePrismaError(error);
    return invitation;
  }
}
