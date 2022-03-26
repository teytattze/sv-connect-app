const BASE_SERVICE = 'specializations';

const INDEX_SPECIALIZATIONS = {
  service: BASE_SERVICE,
  operationId: 'indexSpecializations',
};

const GET_SPECIALIZATION_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'getSpecializationById',
};

const CREATE_SPECIALIZATION = {
  service: BASE_SERVICE,
  operationId: 'createSpecializations',
};

const UPDATE_SPECIALIZATION_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'updateSpecializationById',
};

const DELETE_SPECIALIZATION_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'deleteSpecializationById',
};

export const SpecializationsPattern = {
  INDEX_SPECIALIZATIONS,
  GET_SPECIALIZATION_BY_ID,
  CREATE_SPECIALIZATION,
  UPDATE_SPECIALIZATION_BY_ID,
  DELETE_SPECIALIZATION_BY_ID,
};
