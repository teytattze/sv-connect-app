import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  MatchDto,
  MatchSelectedStudentsBody,
  MatchSingleStudentParam,
} from '@sv-connect/domain';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('single/students/:studentId')
  async matchSingleStudent(
    @Param() param: MatchSingleStudentParam,
  ): Promise<MatchDto> {
    return await this.matchService.matchSingleStudent(param.studentId);
  }

  @Post('students')
  async matchSelectedStudents(
    @Body() body: MatchSelectedStudentsBody,
  ): Promise<MatchDto[]> {
    return await this.matchService.matchSelectedStudents(body);
  }
}
