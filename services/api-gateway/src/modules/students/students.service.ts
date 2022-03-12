import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { StudentsPattern, STUDENTS_CLIENT } from '@sv-connect/common';
import {
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

  async createStudent(payload: ICreateStudentPayload): Promise<IStudent> {
    const [err, result] = await to(
      firstValueFrom(
        this.client.send(StudentsPattern.CREATE_STUDENT, { data: payload }),
      ),
    );
    return result;
  }
}
