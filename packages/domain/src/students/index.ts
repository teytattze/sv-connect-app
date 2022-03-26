export { CreateStudentBody } from './dtos/create-student.dto';
export { DeleteStudentByIdParam } from './dtos/delete-student.dto';
export {
  GetStudentByAccountIdParam,
  GetStudentByIdParam,
} from './dtos/get-student.dto';
export { StudentDto, StudentWithProjectDto } from './dtos/student.dto';
export {
  UpdateStudentBody,
  UpdateStudentByAccountIdParam,
  UpdateStudentByIdParam,
} from './dtos/update-student.dto';

export { StudentEntity } from './entities/student.entity';

export type { IStudentsClient } from './interfaces/client.interface';
export type { IStudentsService } from './interfaces/service.interface';
export type {
  IStudent,
  IStudentWithProject,
} from './interfaces/student.interface';

export type { ICreateStudentPayload } from './payloads/create-student.payload';
export type { IUpdateStudentPayload } from './payloads/update-student.payload';
