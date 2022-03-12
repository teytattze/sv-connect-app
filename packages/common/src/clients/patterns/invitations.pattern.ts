const BASE_SERVICE = 'invitations';

const CREATE_INVITATION = {
  service: BASE_SERVICE,
  operationId: 'createInvitation',
};

const ACCEPT_INVITATION = {
  service: BASE_SERVICE,
  operationId: 'acceptInvitation',
};

const REJECT_INVITATION = {
  service: BASE_SERVICE,
  operationId: 'rejectInvitation',
};

export const InvitationsPattern = {
  CREATE_INVITATION,
  ACCEPT_INVITATION,
  REJECT_INVITATION,
};
