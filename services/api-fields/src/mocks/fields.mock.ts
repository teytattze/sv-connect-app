import { IField } from '@sv-connect/domain';

export const mockFields: IField[] = [
  {
    id: '60016ae0-f5ac-46e3-b57d-b3c8065b34bb',
    title: 'Marketing',
    specializations: [],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
  },
  {
    id: '67e70247-3a03-462f-8569-ed813202f3ab',
    title: 'Artificial Intelligence',
    specializations: [],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
  },
  {
    id: '2044b8f1-c9cf-4801-8bbe-04f2520a9242',
    title: 'Cyber Security',
    specializations: [],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
  },
  {
    id: '41746df3-b968-4579-9241-679641d1882e',
    title: 'Data Science',
    specializations: [],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
  },
  {
    id: '5e000912-9c9a-4445-a980-02c237af4775',
    title: 'Software Engineering',
    specializations: [],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
  },
];

export const mockFieldsRepository = {
  findFields: jest.fn(),
  findField: jest.fn(),
  createField: jest.fn(),
  updateField: jest.fn(),
  deleteField: jest.fn(),
};
