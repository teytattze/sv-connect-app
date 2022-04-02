import { ICoreServiceResponse } from '../../common';
import {
  IMatchSelectedStudentsAndSupervisorsPayload,
  IMatchSelectedStudentsPayload,
  IMatchSingleStudentPayload,
} from '../payload/create-match.payload';
import { IMatch } from './match.interface';

export interface IMatchesClient {
  matchSingleStudent?(
    payload: IMatchSingleStudentPayload,
  ): Promise<ICoreServiceResponse<IMatch>>;
  matchSelectedStudents?(
    payload: IMatchSelectedStudentsPayload,
  ): Promise<ICoreServiceResponse<IMatch[]>>;
  matchSelectedStudentsAndSupervisors?(
    payload: IMatchSelectedStudentsAndSupervisorsPayload,
  ): Promise<ICoreServiceResponse<IMatch[]>>;
}
