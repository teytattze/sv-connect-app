const BASE_SERVICE = 'specializations';

const CREATE_SPECIALIZATION = {
  service: BASE_SERVICE,
  operationId: 'createSpecializations',
};

const DELETE_SPECIALIZATIONS = {
  service: BASE_SERVICE,
  operationId: 'deleteSpecializations',
};

export const SpecializationsPattern = {
  CREATE_SPECIALIZATION,
  DELETE_SPECIALIZATIONS,
};
