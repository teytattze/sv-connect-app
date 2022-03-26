import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PROJECTS_CLIENT, ProjectsPattern } from '@sv-connect/common';
import {
  CoreApiException,
  ICoreApiResponse,
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

  async getProjectById(id: string): Promise<ICoreApiResponse<IProject>> {
    const [error, response] = await to<
      ICoreApiResponse<IProject>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.client.send(ProjectsPattern.GET_PROJECT_BY_ID, { id }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return response;
  }

  async createProject(
    payload: ICreateProjectPayload,
  ): Promise<ICoreApiResponse<IProject>> {
    const [error, response] = await to<
      ICoreApiResponse<IProject>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.client.send(ProjectsPattern.CREATE_PROJECT, { data: payload }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return response;
  }

  async updateProjectById(
    id: string,
    payload: IUpdateProjectPayload,
  ): Promise<ICoreApiResponse<IProject>> {
    const [error, response] = await to<
      ICoreApiResponse<IProject>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.client.send(ProjectsPattern.UPDATE_PROJECT_BY_ID, {
          id,
          data: payload,
        }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return response;
  }
}
