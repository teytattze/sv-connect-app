import { Body, Controller, Post } from '@nestjs/common';
import { CreateStudentBody, StudentDto } from '@sv-connect/domain';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('create')
  async createStudent(@Body() body: CreateStudentBody): Promise<StudentDto> {
    return await this.studentsService.createStudent(body);
  }
}
