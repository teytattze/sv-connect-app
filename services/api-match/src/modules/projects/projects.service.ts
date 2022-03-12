import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ProjectsPattern, PROJECTS_CLIENT } from '@sv-connect/common';
import { IProject, IProjectsClient } from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProjectsService implements IProjectsClient {
  constructor(@Inject(PROJECTS_CLIENT) private readonly client: ClientProxy) {}

  async getProjectByStudentId(studentId: string): Promise<IProject> {
    const [error, result] = await to(
      firstValueFrom(
        this.client.send(ProjectsPattern.GET_PROJECT_BY_STUDENT_ID, {
          studentId,
        }),
      ),
    );
    if (error) throw new RpcException(error);
    return result;
  }
}
