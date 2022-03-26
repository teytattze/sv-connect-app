import { Field, Specialization, Supervisor } from '@prisma/client';

export interface ISupervisor extends Omit<Supervisor, 'fieldId'> {
  field: Field;
  specializations: Specialization[];
}
