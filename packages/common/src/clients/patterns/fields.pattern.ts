const BASE_SERVICE = 'fields';

const INDEX_FIELDS = {
  service: BASE_SERVICE,
  operationId: 'indexFields',
};

const GET_FIELD_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'getFieldById',
};

const CREATE_FIELD = {
  service: BASE_SERVICE,
  operationId: 'createField',
};

const UPDATE_FIELD_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'updatedFieldById',
};

const DELETE_FIELD_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'deleteFieldById',
};

export const FieldsPattern = {
  INDEX_FIELDS,
  GET_FIELD_BY_ID,
  CREATE_FIELD,
  UPDATE_FIELD_BY_ID,
  DELETE_FIELD_BY_ID,
};
