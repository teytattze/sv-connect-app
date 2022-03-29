import { IProject } from '@sv-connect/domain';

export const mockProjects: IProject[] = [
  {
    id: 'ade23c64-721b-46a9-9e43-a6eaf66295cb',
    title: 'Supervisor Matching App',
    summary: '',
    field: {
      id: '5e000912-9c9a-4445-a980-02c237af4775',
      title: 'Software Engineering',
      createdAt: new Date('2020-01-01'),
      updatedAt: new Date('2020-01-01'),
    },
    specializations: [
      {
        id: '77dfc955-338c-47a5-8375-3ff9f79540f2',
        title: 'Distributed Systems',
        createdAt: new Date('2020-01-01'),
        updatedAt: new Date('2020-01-01'),
      },
      {
        id: 'a6f6af22-1ef8-4c74-8af5-32fa3561494f',
        title: 'Front-end Web Development',
        createdAt: new Date('2020-01-01'),
        updatedAt: new Date('2020-01-01'),
      },
    ],
    studentId: '8de3463b-a8c6-4525-b9f3-4d5dd8699c15',
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
  },
  {
    id: 'ca72a385-be01-40b0-8d23-ed5238ceaf57',
    title: 'Travel Recommendation Chrome Extension',
    summary: '',
    field: {
      id: '67e70247-3a03-462f-8569-ed813202f3ab',
      title: 'Artificial Intelligence',
      createdAt: new Date('2020-01-01'),
      updatedAt: new Date('2020-01-01'),
    },
    specializations: [
      {
        id: '766f5fea-f7fd-40eb-b4b0-118461a67edf',
        title: 'AWS Sagemaker',
        createdAt: new Date('2020-01-01'),
        updatedAt: new Date('2020-01-01'),
      },
      {
        id: 'a6f6af22-1ef8-4c74-8af5-32fa3561494f',
        title: 'Front-end Web Development',
        createdAt: new Date('2020-01-01'),
        updatedAt: new Date('2020-01-01'),
      },
    ],
    studentId: '0fa0cc46-8133-441d-bb46-159348f2b15b',
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
  },
];

export const mockProjectsRepository = {
  findProjects: jest.fn(),
  findProject: jest.fn(),
  createProject: jest.fn(),
  updateProject: jest.fn(),
  deleteProject: jest.fn(),
};
