const BASE_SERVICE = 'sessions';

const GET_SESSION_BY_ACCOUNT_ID = {
  service: BASE_SERVICE,
  operationId: 'getSessionByAccountId',
};

const CREATE_SESSION = {
  service: BASE_SERVICE,
  operationId: 'createSession',
};

const INITIALIZE_SESSION = {
  service: BASE_SERVICE,
  operationId: 'initializeSession',
};

const INVALIDATE_SESSION = {
  service: BASE_SERVICE,
  operationId: 'invalidateSession',
};

export const SessionsPattern = {
  GET_SESSION_BY_ACCOUNT_ID,
  CREATE_SESSION,
  INITIALIZE_SESSION,
  INVALIDATE_SESSION,
};
