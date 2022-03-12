const BASE_SERVICE = 'match';

const matchSingleStudent = {
  service: BASE_SERVICE,
  operationId: 'matchSingleStudent',
};

const matchSelectedStudents = {
  service: BASE_SERVICE,
  operationId: 'matchSelectedStudents',
};

const matchSelectedStudentsAndSupervisors = {
  service: BASE_SERVICE,
  operationId: 'matchSelectedStudentsAndSupervisors',
};

export const MatchPattern = {
  MATCH_SINGLE_STUDENT: matchSingleStudent,
  MATCH_SELECTED_STUDENTS: matchSelectedStudents,
  MATCH_SELECTED_STUDENTS_AND_SUPERVISORS: matchSelectedStudentsAndSupervisors,
};
