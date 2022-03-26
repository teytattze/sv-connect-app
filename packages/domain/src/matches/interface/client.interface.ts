import { ICoreApiResponse } from '../../common/api';
import {
  IMatchSelectedStudentsAndSupervisorsPayload,
  IMatchSelectedStudentsPayload,
  IMatchSingleStudentPayload,
} from '../payload/create-match.payload';
import { IMatch } from './match.interface';

export interface IMatchesClient {
  matchSingleStudent?(
    payload: IMatchSingleStudentPayload,
  ): Promise<ICoreApiResponse<IMatch>>;
  matchSelectedStudents?(
    payload: IMatchSelectedStudentsPayload,
  ): Promise<ICoreApiResponse<IMatch[]>>;
  matchSelectedStudentsAndSupervisors?(
    payload: IMatchSelectedStudentsAndSupervisorsPayload,
  ): Promise<ICoreApiResponse<IMatch[]>>;
}
