const BASE_SERVICE = 'fields';

const CREATE_FIELD = {
  service: BASE_SERVICE,
  operationId: 'createField',
};

const DELETE_FIELD = {
  service: BASE_SERVICE,
  operationId: 'deleteField',
};

export const FieldsPattern = {
  CREATE_FIELD,
  DELETE_FIELD,
};
