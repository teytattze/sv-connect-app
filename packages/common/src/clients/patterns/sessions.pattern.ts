const BASE_SERVICE = 'sessions';

const GET_SESSION_BY_ACCOUNT_ID = {
  service: BASE_SERVICE,
  operationId: 'getSessionByAccountId',
};

const CREATE_SESSION = {
  service: BASE_SERVICE,
  operationId: 'createSession',
};

const INITIALIZE_SESSION_BY_ACCOUNT_ID = {
  service: BASE_SERVICE,
  operationId: 'initializeSessionByAccountId',
};

const INVALIDATE_SESSION_BY_ACCOUNT_ID = {
  service: BASE_SERVICE,
  operationId: 'invalidateSessionByAccountId',
};

export const SessionsPattern = {
  GET_SESSION_BY_ACCOUNT_ID,
  CREATE_SESSION,
  INITIALIZE_SESSION_BY_ACCOUNT_ID,
  INVALIDATE_SESSION_BY_ACCOUNT_ID,
};
