import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StudentsPattern } from '@sv-connect/common';
import {
  ICreateStudentPayload,
  IStudent,
  IStudentsClient,
  IUpdateStudentPayload,
} from '@sv-connect/domain';
import { StudentsService } from './students.service';

@Controller()
export class StudentsController implements IStudentsClient {
  constructor(private readonly studentsService: StudentsService) {}

  @MessagePattern(StudentsPattern.INDEX_STUDENTS)
  async indexStudents(): Promise<IStudent[]> {
    return await this.studentsService.indexStudents();
  }

  @MessagePattern(StudentsPattern.GET_STUDENT_BY_ID)
  async getStudentById(@Payload('id') id: string): Promise<IStudent> {
    return await this.studentsService.getStudentById(id);
  }

  @MessagePattern(StudentsPattern.GET_STUDENT_BY_ACCOUNT_ID)
  async getStudentByAccountId(
    @Payload('accountId') accountId: string,
  ): Promise<IStudent> {
    return await this.studentsService.getStudentByAccountId(accountId);
  }

  @MessagePattern(StudentsPattern.CREATE_STUDENT)
  async createStudent(
    @Payload('data') payload: ICreateStudentPayload,
  ): Promise<IStudent> {
    return await this.studentsService.createStudent(payload);
  }

  @MessagePattern(StudentsPattern.UPDATE_STUDENT_BY_ACCOUNT_ID)
  async updateStudentByAccountId(
    @Payload('accountId') accountId,
    @Payload('data') payload: IUpdateStudentPayload,
  ): Promise<IStudent> {
    return await this.studentsService.updateStudentByAccountId(
      accountId,
      payload,
    );
  }
}
