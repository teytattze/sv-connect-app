const BASE_SERVICE = 'invitations';

const CREATE_INVITATION = {
  service: BASE_SERVICE,
  operationId: 'createInvitation',
};

const ACCEPT_INVITATION_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'acceptInvitationById',
};

const REJECT_INVITATION_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'rejectInvitationById',
};

export const InvitationsPattern = {
  CREATE_INVITATION,
  ACCEPT_INVITATION_BY_ID,
  REJECT_INVITATION_BY_ID,
};
