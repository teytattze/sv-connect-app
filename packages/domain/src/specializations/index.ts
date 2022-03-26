export { CreateSpecializationBody } from './dtos/create-specialization.dto';
export { DeleteSpecializationByIdParam } from './dtos/delete-specialization.dto';
export { GetSpecializationByIdParam } from './dtos/get-specialization.dto';
export { SpecializationDto } from './dtos/specialization.dto';
export {
  UpdateSpecializationBody,
  UpdateSpecializationByIdParam,
} from './dtos/update-specialization.dto';

export { SpecializationEntity } from './entities/specialization.entity';

export type { ISpecializationsClient } from './interfaces/client.interface';
export type { ISpecializationsService } from './interfaces/service.interface';
export type { ISpecialization } from './interfaces/specialization.interface';

export type { ICreateSpecializationPayload } from './payloads/create-specialization.payload';
export type { IUpdateSpecializationPayload } from './payloads/update-specialization.payload';
