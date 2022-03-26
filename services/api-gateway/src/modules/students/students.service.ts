import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { StudentsPattern, STUDENTS_CLIENT } from '@sv-connect/common';
import {
  CoreApiException,
  ICoreApiResponse,
  ICreateStudentPayload,
  IStudent,
  IStudentsClient,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

// TODO: Error Handling
@Injectable()
export class StudentsService implements IStudentsClient {
  constructor(@Inject(STUDENTS_CLIENT) private readonly client: ClientProxy) {}

  async createStudent(
    payload: ICreateStudentPayload,
  ): Promise<ICoreApiResponse<IStudent>> {
    const [error, response] = await to<
      ICoreApiResponse<IStudent>,
      ICoreApiResponse<null>
    >(
      firstValueFrom(
        this.client.send(StudentsPattern.CREATE_STUDENT, { data: payload }),
      ),
    );
    if (error) throw CoreApiException.new(error);
    return response;
  }
}
