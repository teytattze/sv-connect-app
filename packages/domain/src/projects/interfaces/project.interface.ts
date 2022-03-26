import { Field, Project, Specialization } from '@prisma/client';

export interface IProject extends Omit<Project, 'fieldId'> {
  field: Field;
  specializations: Specialization[];
}
