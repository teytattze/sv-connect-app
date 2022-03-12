import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  handleClientServiceError,
  MatchPattern,
  MATCH_CLIENT,
} from '@sv-connect/common';
import { IMatch, IMatchClient } from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MatchService implements IMatchClient {
  constructor(@Inject(MATCH_CLIENT) private readonly client: ClientProxy) {}

  async matchSingleStudent(studentId: string): Promise<IMatch> {
    const [error, result] = await to(
      firstValueFrom(
        this.client.send(MatchPattern.MATCH_SINGLE_STUDENT, { studentId }),
      ),
    );
    if (error) handleClientServiceError(error);
    return result;
  }
}
