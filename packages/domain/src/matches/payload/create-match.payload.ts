export interface IMatchSingleStudentPayload {
  studentId: string;
}

export interface IMatchSelectedStudentsPayload {
  studentIds: string[];
}

export interface IMatchSelectedStudentsAndSupervisorsPayload {
  studentIds: string[];
  supervisorIds: string[];
}
