import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MatchPattern } from '@sv-connect/common';
import { IMatch } from '@sv-connect/domain';
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
}
