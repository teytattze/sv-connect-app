import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  handleClientServiceError,
  INVITATIONS_CLIENT,
  InvitationsPattern,
} from '@sv-connect/common';
import {
  ICreateInvitationPayload,
  IInvitation,
  IInvitationsClient,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class InvitationsService implements IInvitationsClient {
  constructor(
    @Inject(INVITATIONS_CLIENT) private readonly client: ClientProxy,
  ) {}

  async createInvitation(
    payload: ICreateInvitationPayload,
  ): Promise<IInvitation> {
    const [err, invitation] = await to(
      firstValueFrom(
        this.client.send(InvitationsPattern.CREATE_INVITATION, {
          data: payload,
        }),
      ),
    );
    if (err) handleClientServiceError(err);
    return invitation;
  }

  async acceptInvitation(id: string): Promise<IInvitation> {
    const [err, invitation] = await to(
      firstValueFrom(
        this.client.send(InvitationsPattern.ACCEPT_INVITATION, { id }),
      ),
    );
    if (err) handleClientServiceError(err);
    return invitation;
  }

  async rejectInvitation(id: string): Promise<IInvitation> {
    const [err, invitation] = await to(
      firstValueFrom(
        this.client.send(InvitationsPattern.REJECT_INVITATION, { id }),
      ),
    );
    if (err) handleClientServiceError(err);
    return invitation;
  }
}
