import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  ICreateStudentPayload,
  IStudent,
  IStudentsService,
  IUpdateStudentPayload,
  StudentsCode,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { handlePrismaError } from './students.helper';
import { StudentsRepository } from './students.repository';

@Injectable()
export class StudentsService implements IStudentsService {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  async indexStudents(): Promise<IStudent[]> {
    const [error, students] = await to<IStudent[], any>(
      this.studentsRepository.findStudents(),
    );
    if (error) handlePrismaError(error);
    return students;
  }

  async getStudentById(id: string): Promise<IStudent> {
    const [error, student] = await to<IStudent, any>(
      this.studentsRepository.findStudent({ id }),
    );
    if (error) handlePrismaError(error);
    if (!student) throw new RpcException(StudentsCode.STUDENT_NOT_FOUND);
    return student;
  }

  async getStudentByAccountId(accountId: string): Promise<IStudent> {
    const [error, student] = await to<IStudent, any>(
      this.studentsRepository.findStudent({ accountId }),
    );
    if (error) handlePrismaError(error);
    if (!student) throw new RpcException(StudentsCode.STUDENT_NOT_FOUND);
    return student;
  }

  async createStudent(payload: ICreateStudentPayload): Promise<IStudent> {
    const [error, student] = await to<IStudent, any>(
      this.studentsRepository.createStudent(payload),
    );
    if (error) handlePrismaError(error);
    return student;
  }

  async updateStudentById(
    id: string,
    payload: IUpdateStudentPayload,
  ): Promise<IStudent> {
    const [error, student] = await to<IStudent, any>(
      this.studentsRepository.updateStudent({ id }, payload),
    );
    if (error) handlePrismaError(error);
    return student;
  }

  async updateStudentByAccountId(
    accountId: string,
    payload: IUpdateStudentPayload,
  ): Promise<IStudent> {
    const [error, student] = await to<IStudent, any>(
      this.studentsRepository.updateStudent({ accountId }, payload),
    );
    if (error) handlePrismaError(error);
    return student;
  }

  async deleteStudentById(id: string): Promise<void> {
    const [error] = await to<void, any>(
      this.studentsRepository.deleteStudent({ id }),
    );
    if (error) handlePrismaError(error);
  }
}
