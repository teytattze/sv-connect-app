const BASE_SERVICE = 'students';

const INDEX_STUDENTS = {
  service: BASE_SERVICE,
  operationId: 'indexStudents',
};

const GET_STUDENT_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'getStudentById',
};

const GET_STUDENT_BY_ACCOUNT_ID = {
  service: BASE_SERVICE,
  operationId: 'getStudentByAccountId',
};

const CREATE_STUDENT = {
  service: BASE_SERVICE,
  operationId: 'createStudent',
};

const UPDATE_STUDENT_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'updateStudentById',
};

const UPDATE_STUDENT_BY_ACCOUNT_ID = {
  service: BASE_SERVICE,
  operationId: 'updateStudentByAccountId',
};

const DELETE_STUDENT_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'deleteStudentById',
};

export const StudentsPattern = {
  INDEX_STUDENTS,
  GET_STUDENT_BY_ID,
  GET_STUDENT_BY_ACCOUNT_ID,
  CREATE_STUDENT,
  UPDATE_STUDENT_BY_ID,
  UPDATE_STUDENT_BY_ACCOUNT_ID,
  DELETE_STUDENT_BY_ID,
};
