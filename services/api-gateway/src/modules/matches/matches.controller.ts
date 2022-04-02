import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CoreHttpResponse,
  MatchDto,
  MatchSelectedStudentsAndSupervisorsBody,
  MatchSelectedStudentsBody,
  MatchSingleStudentBody,
} from '@sv-connect/domain';
import { MatchesService } from './matches.service';

@ApiTags('Matches')
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post('single/students')
  async matchSingleStudent(
    @Body() { studentId }: MatchSingleStudentBody,
  ): Promise<CoreHttpResponse<MatchDto>> {
    const { data } = await this.matchesService.matchSingleStudent({
      studentId,
    });
    return CoreHttpResponse.success({ data });
  }

  @Post('selected/students')
  async matchSelectedStudents(
    @Body() { studentIds }: MatchSelectedStudentsBody,
  ): Promise<CoreHttpResponse<MatchDto[]>> {
    const { data } = await this.matchesService.matchSelectedStudents({
      studentIds,
    });
    return CoreHttpResponse.success({ data });
  }

  @Post('selected/students/selected/supervisors')
  async matchSelectedStudentsAndSupervisors(
    @Body()
    { studentIds, supervisorIds }: MatchSelectedStudentsAndSupervisorsBody,
  ): Promise<CoreHttpResponse<MatchDto[]>> {
    const { data } =
      await this.matchesService.matchSelectedStudentsAndSupervisors({
        studentIds,
        supervisorIds,
      });
    return CoreHttpResponse.success({ data });
  }
}
