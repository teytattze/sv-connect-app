import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { INVITATIONS_CLIENT, InvitationsPattern } from '@sv-connect/common';
import {
  CoreApiException,
  ICoreApiResponse,
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
  ): Promise<ICoreApiResponse<IInvitation>> {
    const [error, response] = await to<
      ICoreApiResponse<IInvitation>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.client.send(InvitationsPattern.CREATE_INVITATION, {
          data: payload,
        }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return response;
  }

  async acceptInvitationById(
    id: string,
  ): Promise<ICoreApiResponse<IInvitation>> {
    const [error, invitation] = await to<
      ICoreApiResponse<IInvitation>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.client.send(InvitationsPattern.ACCEPT_INVITATION_BY_ID, { id }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return invitation;
  }

  async rejectInvitationById(
    id: string,
  ): Promise<ICoreApiResponse<IInvitation>> {
    const [error, invitation] = await to<
      ICoreApiResponse<IInvitation>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.client.send(InvitationsPattern.REJECT_INVITATION_BY_ID, { id }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return invitation;
  }
}
