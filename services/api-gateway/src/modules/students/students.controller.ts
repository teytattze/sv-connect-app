import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CoreHttpResponse,
  CreateStudentBody,
  StudentDto,
} from '@sv-connect/domain';
import { StudentsService } from './students.service';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('create')
  async createStudent(
    @Body() body: CreateStudentBody,
  ): Promise<CoreHttpResponse<StudentDto>> {
    const { data } = await this.studentsService.createStudent(body);
    return CoreHttpResponse.success({ data });
  }
}
