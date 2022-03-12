import { Injectable } from '@nestjs/common';
import {
  ICreateStudentPayload,
  IStudent,
  IUpdateStudentPayload,
} from '@sv-connect/domain';
import { StudentsRepository } from './students.repository';

@Injectable()
export class StudentsService {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  async indexStudents(): Promise<IStudent[]> {
    return await this.studentsRepository.findStudents();
  }

  async getStudentById(id: string): Promise<IStudent> {
    return await this.studentsRepository.findStudent({ id });
  }

  async getStudentByAccountId(accountId: string): Promise<IStudent> {
    return await this.studentsRepository.findStudent({ accountId });
  }

  async createStudent(payload: ICreateStudentPayload): Promise<IStudent> {
    return await this.studentsRepository.createStudent(payload);
  }

  async updateStudentByAccountId(
    accountId: string,
    payload: IUpdateStudentPayload,
  ): Promise<IStudent> {
    return await this.studentsRepository.updateStudent({ accountId }, payload);
  }
}
