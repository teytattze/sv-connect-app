import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StudentsPattern } from '@sv-connect/common';
import {
  CoreApiResponse,
  ICoreApiResponse,
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
  async indexStudents(): Promise<ICoreApiResponse<IStudent[]>> {
    const students = await this.studentsService.indexStudents();
    return CoreApiResponse.success(students);
  }

  @MessagePattern(StudentsPattern.GET_STUDENT_BY_ID)
  async getStudentById(
    @Payload('id') id: string,
  ): Promise<ICoreApiResponse<IStudent>> {
    const student = await this.studentsService.getStudentById(id);
    return CoreApiResponse.success(student);
  }

  @MessagePattern(StudentsPattern.GET_STUDENT_BY_ACCOUNT_ID)
  async getStudentByAccountId(
    @Payload('accountId') accountId: string,
  ): Promise<ICoreApiResponse<IStudent>> {
    const student = await this.studentsService.getStudentByAccountId(accountId);
    return CoreApiResponse.success(student);
  }

  @MessagePattern(StudentsPattern.CREATE_STUDENT)
  async createStudent(
    @Payload('data') payload: ICreateStudentPayload,
  ): Promise<ICoreApiResponse<IStudent>> {
    const student = await this.studentsService.createStudent(payload);
    return CoreApiResponse.success(student);
  }

  @MessagePattern(StudentsPattern.UPDATE_STUDENT_BY_ID)
  async updateStudentById(
    @Payload('id') id: string,
    @Payload('data') payload: IUpdateStudentPayload,
  ): Promise<ICoreApiResponse<IStudent>> {
    const student = await this.studentsService.updateStudentById(id, payload);
    return CoreApiResponse.success(student);
  }

  @MessagePattern(StudentsPattern.UPDATE_STUDENT_BY_ACCOUNT_ID)
  async updateStudentByAccountId(
    @Payload('accountId') accountId: string,
    @Payload('data') payload: IUpdateStudentPayload,
  ): Promise<ICoreApiResponse<IStudent>> {
    const student = await this.studentsService.updateStudentByAccountId(
      accountId,
      payload,
    );
    return CoreApiResponse.success(student);
  }

  @MessagePattern(StudentsPattern.DELETE_STUDENT_BY_ID)
  async deleteStudentById(
    @Payload('id') id: string,
  ): Promise<ICoreApiResponse<null>> {
    await this.studentsService.deleteStudentById(id);
    return CoreApiResponse.success(null, 'Student deleted successfully');
  }
}
