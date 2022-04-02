import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProjectsPattern, PROJECTS_CLIENT } from '@sv-connect/common';
import {
  CoreRpcException,
  ICoreServiceResponse,
  IProject,
  IProjectsClient,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProjectsService implements IProjectsClient {
  constructor(@Inject(PROJECTS_CLIENT) private readonly client: ClientProxy) {}

  async getProjectByStudentId(
    studentId: string,
  ): Promise<ICoreServiceResponse<IProject>> {
    const [error, response] = await to<
      ICoreServiceResponse<IProject>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(ProjectsPattern.GET_PROJECT_BY_STUDENT_ID, {
          studentId,
        }),
      ),
    );
    if (error) throw CoreRpcException.fromService(error);
    return response;
  }
}
