import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  handleClientServiceError,
  PROJECTS_CLIENT,
  ProjectsPattern,
} from '@sv-connect/common';
import {
  ICreateProjectPayload,
  IProject,
  IProjectsClient,
  IUpdateProjectPayload,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProjectsService implements IProjectsClient {
  constructor(@Inject(PROJECTS_CLIENT) private readonly client: ClientProxy) {}

  async getProjectById(id: string): Promise<IProject> {
    const [err, result] = await to(
      firstValueFrom(
        this.client.send(ProjectsPattern.GET_PROJECT_BY_ID, { id }),
      ),
    );
    if (err) handleClientServiceError(err);
    return result;
  }

  async createProject(payload: ICreateProjectPayload): Promise<IProject> {
    const [err, result] = await to(
      firstValueFrom(
        this.client.send(ProjectsPattern.CREATE_PROJECT, { data: payload }),
      ),
    );
    if (err) handleClientServiceError(err);
    return result;
  }

  async updateProjectById(
    id: string,
    payload: IUpdateProjectPayload,
  ): Promise<IProject> {
    const [err, result] = await to(
      firstValueFrom(
        this.client.send(ProjectsPattern.UPDATE_PROJECT_BY_ID, {
          id,
          data: payload,
        }),
      ),
    );
    if (err) handleClientServiceError(err);
    return result;
  }
}
