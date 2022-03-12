import {
  ICreateStudentPayload,
  IUpdateStudentPayload,
} from '../payloads/students.payload';
import { IProject } from './projects.interface';

export interface IStudent {
  id: string;
  accountId: string;
  supervisorId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStudentWithProject extends IStudent {
  project: IProject;
}

export interface IStudentsService {
  indexStudents(): Promise<IStudent[]>;
  getStudentById(id: string): Promise<IStudent>;
  getStudentByAccountId(accountId: string): Promise<IStudent>;
  createStudent(payload: ICreateStudentPayload): Promise<IStudent>;
  updateStudentByAccountId(
    accountId: string,
    payload: IUpdateStudentPayload,
  ): Promise<IStudent>;
}

export interface IStudentsClient extends Partial<IStudentsService> {}
