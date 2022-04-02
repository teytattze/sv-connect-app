import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MatchPattern, MATCH_CLIENT } from '@sv-connect/common';
import {
  CoreHttpException,
  ICoreServiceResponse,
  IMatch,
  IMatchesClient,
  IMatchSelectedStudentsAndSupervisorsPayload,
  IMatchSelectedStudentsPayload,
  IMatchSingleStudentPayload,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MatchesService implements IMatchesClient {
  constructor(@Inject(MATCH_CLIENT) private readonly client: ClientProxy) {}

  async matchSingleStudent({
    studentId,
  }: IMatchSingleStudentPayload): Promise<ICoreServiceResponse<IMatch>> {
    const [error, response] = await to<
      ICoreServiceResponse<IMatch>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(MatchPattern.MATCH_SINGLE_STUDENT, {
          data: { studentId },
        }),
      ),
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async matchSelectedStudents({
    studentIds,
  }: IMatchSelectedStudentsPayload): Promise<ICoreServiceResponse<IMatch[]>> {
    const [error, response] = await to<
      ICoreServiceResponse<IMatch[]>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(MatchPattern.MATCH_SELECTED_STUDENTS, {
          data: { studentIds },
        }),
      ),
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async matchSelectedStudentsAndSupervisors({
    studentIds,
    supervisorIds,
  }: IMatchSelectedStudentsAndSupervisorsPayload): Promise<
    ICoreServiceResponse<IMatch[]>
  > {
    const [error, response] = await to<
      ICoreServiceResponse<IMatch[]>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(MatchPattern.MATCH_SELECTED_STUDENTS_AND_SUPERVISORS, {
          data: {
            studentIds,
            supervisorIds,
          },
        }),
      ),
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }
}
