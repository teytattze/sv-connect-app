import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MatchPattern, MATCH_CLIENT } from '@sv-connect/common';
import {
  CoreApiException,
  ICoreApiResponse,
  IMatch,
  IMatchesClient,
  IMatchSelectedStudentsPayload,
  IMatchSingleStudentPayload,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MatchesService implements IMatchesClient {
  constructor(@Inject(MATCH_CLIENT) private readonly client: ClientProxy) {}

  async matchSingleStudent(
    payload: IMatchSingleStudentPayload,
  ): Promise<ICoreApiResponse<IMatch>> {
    const [error, response] = await to<
      ICoreApiResponse<IMatch>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.client.send(MatchPattern.MATCH_SINGLE_STUDENT, { data: payload }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return response;
  }

  async matchSelectedStudents(
    payload: IMatchSelectedStudentsPayload,
  ): Promise<ICoreApiResponse<IMatch[]>> {
    const [error, response] = await to<
      ICoreApiResponse<IMatch[]>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.client.send(MatchPattern.MATCH_SELECTED_STUDENTS, {
          data: payload,
        }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return response;
  }
}
