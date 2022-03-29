import { ISupervisor } from '@sv-connect/domain';

export const mockSupervisors: ISupervisor[] = [
  {
    id: '40ce0c66-d28b-41e8-8b98-0712167eebbb',
    capacity: 0,
    accountId: '22e57dce-e066-4f7e-9803-97f0f60c3c60',
    field: {
      id: '5e000912-9c9a-4445-a980-02c237af4775',
      title: 'Software Engineering',
      createdAt: new Date('2020-01-01'),
      updatedAt: new Date('2020-01-01'),
    },
    specializations: [],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
  },
  {
    id: 'b348c9c4-3fdf-47d0-a1fa-5ce58a002d00',
    capacity: 5,
    accountId: '957253d6-2346-42de-9e6d-6ebd9641dbdb',
    field: {
      id: '5e000912-9c9a-4445-a980-02c237af4775',
      title: 'Software Engineering',
      createdAt: new Date('2020-01-01'),
      updatedAt: new Date('2020-01-01'),
    },
    specializations: [],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
  },
  {
    id: 'a3a0b8d0-e52c-4de1-8c42-6a54a876917b',
    capacity: 10,
    accountId: 'ccc21910-a22b-4d6b-bbd0-e93fe0a24503',
    field: {
      id: '5e000912-9c9a-4445-a980-02c237af4775',
      title: 'Software Engineering',
      createdAt: new Date('2020-01-01'),
      updatedAt: new Date('2020-01-01'),
    },
    specializations: [],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
  },
  {
    id: '9b8ba429-8eb5-4b00-9124-fd1e2d489e95',
    capacity: 5,
    accountId: '0dba5aac-2cff-4255-bc90-4e895d8e6387',
    field: {
      id: '67e70247-3a03-462f-8569-ed813202f3ab',
      title: 'Artificial Intelligence',
      createdAt: new Date('2020-01-01'),
      updatedAt: new Date('2020-01-01'),
    },
    specializations: [],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
  },
];

export const mockSupervisorsRepository = {
  findSupervisors: jest.fn(),
  findSupervisor: jest.fn(),
  createSupervisor: jest.fn(),
  updateSupervisor: jest.fn(),
  deleteSupervisor: jest.fn(),
};
