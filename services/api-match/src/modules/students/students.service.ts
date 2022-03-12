import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { StudentsPattern, STUDENTS_CLIENT } from '@sv-connect/common';
import { IStudent, IStudentsClient } from '@sv-connect/domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StudentsService implements IStudentsClient {
  constructor(@Inject(STUDENTS_CLIENT) private readonly client: ClientProxy) {}

  async getStudentById(id: string): Promise<IStudent> {
    const [error, result] = await to(
      firstValueFrom(
        this.client.send(StudentsPattern.GET_STUDENT_BY_ID, { id }),
      ),
    );
    if (error) throw new RpcException(error);
    return result;
  }
}
