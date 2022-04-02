import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StudentsPattern } from '@sv-connect/common';
import {
  CoreServiceResponse,
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
  async indexStudents(): Promise<CoreServiceResponse<IStudent[]>> {
    const students = await this.studentsService.indexStudents();
    return CoreServiceResponse.success({ data: students });
  }

  @MessagePattern(StudentsPattern.GET_STUDENT_BY_ID)
  async getStudentById(
    @Payload('id') id: string,
  ): Promise<CoreServiceResponse<IStudent>> {
    const student = await this.studentsService.getStudentById(id);
    return CoreServiceResponse.success({ data: student });
  }

  @MessagePattern(StudentsPattern.GET_STUDENT_BY_ACCOUNT_ID)
  async getStudentByAccountId(
    @Payload('accountId') accountId: string,
  ): Promise<CoreServiceResponse<IStudent>> {
    const student = await this.studentsService.getStudentByAccountId(accountId);
    return CoreServiceResponse.success({ data: student });
  }

  @MessagePattern(StudentsPattern.CREATE_STUDENT)
  async createStudent(
    @Payload('data') payload: ICreateStudentPayload,
  ): Promise<CoreServiceResponse<IStudent>> {
    const student = await this.studentsService.createStudent(payload);
    return CoreServiceResponse.success({ data: student });
  }

  @MessagePattern(StudentsPattern.UPDATE_STUDENT_BY_ID)
  async updateStudentById(
    @Payload('id') id: string,
    @Payload('data') payload: IUpdateStudentPayload,
  ): Promise<CoreServiceResponse<IStudent>> {
    const student = await this.studentsService.updateStudentById(id, payload);
    return CoreServiceResponse.success({ data: student });
  }

  @MessagePattern(StudentsPattern.UPDATE_STUDENT_BY_ACCOUNT_ID)
  async updateStudentByAccountId(
    @Payload('accountId') accountId: string,
    @Payload('data') payload: IUpdateStudentPayload,
  ): Promise<CoreServiceResponse<IStudent>> {
    const student = await this.studentsService.updateStudentByAccountId(
      accountId,
      payload,
    );
    return CoreServiceResponse.success({ data: student });
  }

  @MessagePattern(StudentsPattern.DELETE_STUDENT_BY_ID)
  async deleteStudentById(
    @Payload('id') id: string,
  ): Promise<CoreServiceResponse<null>> {
    await this.studentsService.deleteStudentById(id);
    return CoreServiceResponse.success({
      message: 'Student deleted successfully',
    });
  }
}
