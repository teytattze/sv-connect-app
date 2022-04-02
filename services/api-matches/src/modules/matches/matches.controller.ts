import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MatchPattern } from '@sv-connect/common';
import {
  CoreServiceResponse,
  IMatch,
  IMatchesClient,
  IMatchSelectedStudentsAndSupervisorsPayload,
  IMatchSelectedStudentsPayload,
  IMatchSingleStudentPayload,
} from '@sv-connect/domain';
import { MatchesService } from './matches.service';

@Controller()
export class MatchesController implements IMatchesClient {
  constructor(private readonly matchesService: MatchesService) {}

  @MessagePattern(MatchPattern.MATCH_SINGLE_STUDENT)
  async matchSingleStudent(
    @Payload('data') { studentId }: IMatchSingleStudentPayload,
  ): Promise<CoreServiceResponse<IMatch>> {
    const matchResult = await this.matchesService.matchSingleStudent({
      studentId,
    });
    return CoreServiceResponse.success({ data: matchResult });
  }

  @MessagePattern(MatchPattern.MATCH_SELECTED_STUDENTS)
  async matchSelectedStudents(
    @Payload('data') { studentIds }: IMatchSelectedStudentsPayload,
  ): Promise<CoreServiceResponse<IMatch[]>> {
    const matchResult = await this.matchesService.matchSelectedStudents({
      studentIds,
    });
    return CoreServiceResponse.success({ data: matchResult });
  }

  @MessagePattern(MatchPattern.MATCH_SELECTED_STUDENTS_AND_SUPERVISORS)
  async matchSelectedStudentsAndSupervisors(
    @Payload('data')
    { studentIds, supervisorIds }: IMatchSelectedStudentsAndSupervisorsPayload,
  ): Promise<CoreServiceResponse<IMatch[]>> {
    const matchResult =
      await this.matchesService.matchSelectedStudentsAndSupervisors({
        studentIds,
        supervisorIds,
      });
    return CoreServiceResponse.success({ data: matchResult });
  }
}
