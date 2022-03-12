const BASE_SERVICE = 'auth';

const LOGIN = {
  service: BASE_SERVICE,
  operationId: 'login',
};

const LOGOUT = {
  service: BASE_SERVICE,
  operationId: 'logout',
};

const REFRESH_ACCESS = {
  service: BASE_SERVICE,
  operationId: 'refreshAccess',
};

export const AuthPattern = {
  LOGIN,
  LOGOUT,
  REFRESH_ACCESS,
};
