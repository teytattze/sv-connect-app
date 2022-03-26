import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MatchPattern } from '@sv-connect/common';
import {
  CoreApiResponse,
  ICoreApiResponse,
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
  ): Promise<ICoreApiResponse<IMatch>> {
    const matchResult = await this.matchesService.matchSingleStudent(studentId);
    return CoreApiResponse.success(matchResult);
  }

  @MessagePattern(MatchPattern.MATCH_SELECTED_STUDENTS)
  async matchSelectedStudents(
    @Payload('data') payload: IMatchSelectedStudentsPayload,
  ): Promise<ICoreApiResponse<IMatch[]>> {
    const matchResult = await this.matchesService.matchSelectedStudent(payload);
    return CoreApiResponse.success(matchResult);
  }

  @MessagePattern(MatchPattern.MATCH_SELECTED_STUDENTS_AND_SUPERVISORS)
  async matchSelectedStudentsAndSupervisors(
    @Payload('data') payload: IMatchSelectedStudentsAndSupervisorsPayload,
  ): Promise<ICoreApiResponse<IMatch[]>> {
    return;
  }
}
