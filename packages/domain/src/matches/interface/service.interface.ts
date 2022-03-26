import {
  IMatchSelectedStudentsAndSupervisorsPayload,
  IMatchSelectedStudentsPayload,
  IMatchSingleStudentPayload,
} from '../payload/create-match.payload';
import { IMatch } from './match.interface';

export interface IMatchesService {
  matchSingleStudent(payload: IMatchSingleStudentPayload): Promise<IMatch>;
  matchSelectedStudents(
    payload: IMatchSelectedStudentsPayload,
  ): Promise<IMatch[]>;
  matchSelectedStudentsAndSupervisors(
    payload: IMatchSelectedStudentsAndSupervisorsPayload,
  ): Promise<IMatch[]>;
}
