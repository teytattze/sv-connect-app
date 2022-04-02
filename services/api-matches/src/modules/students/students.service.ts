import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { StudentsPattern, STUDENTS_CLIENT } from '@sv-connect/common';
import {
  CoreRpcException,
  ICoreServiceResponse,
  IStudent,
  IStudentsClient,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StudentsService implements IStudentsClient {
  constructor(@Inject(STUDENTS_CLIENT) private readonly client: ClientProxy) {}

  async getStudentById(id: string): Promise<ICoreServiceResponse<IStudent>> {
    const [error, response] = await to<
      ICoreServiceResponse<IStudent>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(StudentsPattern.GET_STUDENT_BY_ID, { id }),
      ),
    );
    if (error) throw CoreRpcException.fromService(error);
    return response;
  }
}
