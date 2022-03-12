const BASE_SERVICE = 'accounts';

const ADMIN_GET_ACCOUNT_BY_EMAIL = {
  service: BASE_SERVICE,
  operationId: 'adminGetAccountByEmail',
};

const INDEX_ACCOUNTS = {
  service: BASE_SERVICE,
  operationId: 'indexAccounts',
};

const GET_ACCOUNT_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'getAccountById',
};

const GET_ACCOUNT_BY_EMAIL = {
  service: BASE_SERVICE,
  operationId: 'getAccountByEmail',
};

const CREATE_ACCOUNT = {
  service: BASE_SERVICE,
  operationId: 'createAccount',
};

const UPDATE_ACCOUNT_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'updateAccountById',
};

const UPDATE_ACCOUNT_BY_EMAIL = {
  service: BASE_SERVICE,
  operationId: 'updateAccountByEmail',
};

const DELETE_ACCOUNT_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'deleteAccountById',
};

export const AccountsPattern = {
  ADMIN_GET_ACCOUNT_BY_EMAIL,
  INDEX_ACCOUNTS,
  GET_ACCOUNT_BY_ID,
  GET_ACCOUNT_BY_EMAIL,
  CREATE_ACCOUNT,
  UPDATE_ACCOUNT_BY_ID,
  UPDATE_ACCOUNT_BY_EMAIL,
  DELETE_ACCOUNT_BY_ID,
};
