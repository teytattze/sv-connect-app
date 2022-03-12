const BASE_SERVICE = 'profiles';

const CREATE_PROFILE = {
  service: BASE_SERVICE,
  operationId: 'createProfile',
};

const UPDATE_PROFILE_BY_ACCOUNT_ID = {
  service: BASE_SERVICE,
  operationId: 'updateProfileByAccountId',
};

export const ProfilesPattern = {
  CREATE_PROFILE,
  UPDATE_PROFILE_BY_ACCOUNT_ID,
};
