import { Field, Specialization } from '@prisma/client';

export interface IField extends Field {
  specializations: Specialization[];
}
