const BASE_SERVICE = 'profiles';

const GET_PROFILE_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'getProfileById',
};

const GET_PROFILE_BY_ACCOUNT_ID = {
  service: BASE_SERVICE,
  operationId: 'getProfileByAccountId',
};

const CREATE_PROFILE = {
  service: BASE_SERVICE,
  operationId: 'createProfile',
};

const UPDATE_PROFILE_BY_ACCOUNT_ID = {
  service: BASE_SERVICE,
  operationId: 'updateProfileByAccountId',
};

export const ProfilesPattern = {
  GET_PROFILE_BY_ID,
  GET_PROFILE_BY_ACCOUNT_ID,
  CREATE_PROFILE,
  UPDATE_PROFILE_BY_ACCOUNT_ID,
};
