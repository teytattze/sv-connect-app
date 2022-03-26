import { randUuid } from '@ngneat/falso';
import { Field } from '@prisma/client';

export const fieldsTitle = [
  'Software Engineering',
  'Security and Reliability',
  'Visual Computing and Robotic',
  'Artificial Intelligent',
  'Management and Finance',
];

export const createFields = (): Field[] => {
  return fieldsTitle.map((title) => ({
    id: randUuid(),
    title: title,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
};
