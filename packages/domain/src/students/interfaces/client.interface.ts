import { ICoreApiResponse } from '../../common/api';
import { ICreateStudentPayload } from '../payloads/create-student.payload';
import { IUpdateStudentPayload } from '../payloads/update-student.payload';
import { IStudent } from './student.interface';

export interface IStudentsClient {
  indexStudents?(): Promise<ICoreApiResponse<IStudent[]>>;
  getStudentById?(id: string): Promise<ICoreApiResponse<IStudent>>;
  getStudentByAccountId?(
    accountId: string,
  ): Promise<ICoreApiResponse<IStudent>>;
  createStudent?(
    payload: ICreateStudentPayload,
  ): Promise<ICoreApiResponse<IStudent>>;
  udpateStudentById?(
    id: string,
    payload: IUpdateStudentPayload,
  ): Promise<ICoreApiResponse<IStudent>>;
  updateStudentByAccountId?(
    accountId: string,
    payload: IUpdateStudentPayload,
  ): Promise<ICoreApiResponse<IStudent>>;
  deleteStudentById?(id: string): Promise<ICoreApiResponse<null>>;
}
