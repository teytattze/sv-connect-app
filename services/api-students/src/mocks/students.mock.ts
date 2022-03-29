import { IStudent } from '@sv-connect/domain';

export const mockStudents: IStudent[] = [
  {
    id: '1eb166d7-19a6-419d-92c2-9bc0ce39ae52',
    accountId: '1c16712b-9e6a-48c9-9b96-2f742173192c',
    supervisorId: null,
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
  },
  {
    id: 'df5ecfc0-04e4-4e83-a66a-c4befa6e807e',
    accountId: '03179693-42e2-40cc-b905-02a3b8537730',
    supervisorId: 'fc6d44ca-877e-441f-b614-9f14c8f60ab0',
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
  },
];

export const mockStudentsRepository = {
  findStudents: jest.fn(),
  findStudent: jest.fn(),
  createStudent: jest.fn(),
  updateStudent: jest.fn(),
  deleteStudent: jest.fn(),
};
