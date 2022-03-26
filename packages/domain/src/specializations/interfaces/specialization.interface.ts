import { Field, Specialization } from '@prisma/client';

export interface ISpecialization extends Specialization {
  fields: Field[];
}
