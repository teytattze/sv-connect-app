import {
  IMatchSelectedStudentsPayload,
  IMatchSelectedStudentsAndSupervisorsPayload,
} from '../payloads';
import { IStudentWithProject } from './students.interface';
import { ISupervisor } from './supervisors.interface';

export interface IMatch {
  student: IStudentWithProject | null;
  supervisor: ISupervisor | null;
  isMatched: boolean;
  isConfirm: boolean;
}

export interface IMatchService {
  matchSingleStudent(studentId: string): Promise<IMatch>;
  matchSelectedStudents(
    payload: IMatchSelectedStudentsPayload,
  ): Promise<IMatch[]>;
  matchSelectedStudentsAndSupervisors(
    payload: IMatchSelectedStudentsAndSupervisorsPayload,
  ): Promise<IMatch[]>;
}

export interface IMatchClient extends Partial<IMatchService> {}
