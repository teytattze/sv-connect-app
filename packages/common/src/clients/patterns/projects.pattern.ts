const BASE_SERVICE = 'projects';

const INDEX_PROJECTS = {
  service: BASE_SERVICE,
  operationId: 'indexProjects',
};

const GET_PROJECT_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'getProjectById',
};

const GET_PROJECT_BY_STUDENT_ID = {
  service: BASE_SERVICE,
  operationId: 'getProjectByStudentId',
};

const CREATE_PROJECT = {
  service: BASE_SERVICE,
  operationId: 'createProject',
};

const UPDATE_PROJECT_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'updateProjectById',
};

const DELETE_PROJECT_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'deleteProjectById',
};

export const ProjectsPattern = {
  INDEX_PROJECTS,
  GET_PROJECT_BY_ID,
  GET_PROJECT_BY_STUDENT_ID,
  CREATE_PROJECT,
  UPDATE_PROJECT_BY_ID,
  DELETE_PROJECT_BY_ID,
};
