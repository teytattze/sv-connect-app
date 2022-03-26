const BASE_SERVICE = 'supervisors';

const INDEX_SUPERVISORS = {
  service: BASE_SERVICE,
  operationId: 'indexSupervisors',
};

const GET_SUPERVISOR_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'getSupervisorById',
};

const GET_SUPERVISOR_BY_ACCOUNT_ID = {
  service: BASE_SERVICE,
  operationId: 'getSupervisorByAccountId',
};

const CREATE_SUPERVISOR = {
  service: BASE_SERVICE,
  operationId: 'createSupervisor',
};

const UPDATE_SUPERVISOR_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'updateSupervisorById',
};

const UPDATE_SUPERVISOR_BY_ACCOUNT_ID = {
  service: BASE_SERVICE,
  operationId: 'updateSupervisorByAccountId',
};

const DELETE_SUPERVISOR_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'deleteSupervisorById',
};

export const SupervisorsPattern = {
  INDEX_SUPERVISORS,
  GET_SUPERVISOR_BY_ID,
  GET_SUPERVISOR_BY_ACCOUNT_ID,
  CREATE_SUPERVISOR,
  UPDATE_SUPERVISOR_BY_ID,
  UPDATE_SUPERVISOR_BY_ACCOUNT_ID,
  DELETE_SUPERVISOR_BY_ID,
};
