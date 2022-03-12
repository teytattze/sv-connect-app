import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MatchPattern } from '@sv-connect/common';
import {
  IMatch,
  IMatchSelectedStudentsAndSupervisorsPayload,
  IMatchSelectedStudentsPayload,
} from '@sv-connect/domain';
import { MatchService } from './match.service';

@Controller()
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @MessagePattern(MatchPattern.MATCH_SINGLE_STUDENT)
  async matchSingleStudent(
    @Payload('studentId') studentId: string,
  ): Promise<IMatch> {
    return await this.matchService.matchSingleStudent(studentId);
  }

  @MessagePattern(MatchPattern.MATCH_SELECTED_STUDENTS)
  async matchSelectedStudents(
    @Payload('data') payload: IMatchSelectedStudentsPayload,
  ): Promise<IMatch[]> {
    return await this.matchService.matchSelectedStudent(payload);
  }

  @MessagePattern(MatchPattern.MATCH_SELECTED_STUDENTS_AND_SUPERVISORS)
  async matchSelectedStudentsAndSupervisors(
    @Payload('data') payload: IMatchSelectedStudentsAndSupervisorsPayload,
  ): Promise<IMatch[]> {
    return;
  }
}
