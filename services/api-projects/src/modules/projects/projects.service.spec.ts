import { Test } from '@nestjs/testing';
import { Provider } from '@nestjs/common';
import { ProjectsRepository } from './projects.repository';
import { ProjectsService } from './projects.service';
import {
  mockProjects,
  mockProjectsRepository,
} from '../../mocks/projects.mock';
import {
  ICreateProjectPayload,
  IProject,
  PrismaErrorCode,
  ProjectsCode,
} from '@sv-connect/domain';
import { Prisma } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

describe('ProjectsService', () => {
  let service: ProjectsService;
  const mockProviders: Provider[] = [
    {
      provide: ProjectsRepository,
      useValue: mockProjectsRepository,
    },
  ];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ProjectsService, ...mockProviders],
    }).compile();
    service = await moduleRef.get<ProjectsService>(ProjectsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  describe('indexProjects', () => {
    it('should return all projects', async () => {
      mockProjectsRepository.findProjects.mockResolvedValue(mockProjects);
      const projects = await service.indexProjects();
      expect(projects).toEqual(mockProjects);
    });
  });

  describe('getProjectById', () => {
    it('should return project', async () => {
      const id = 'ade23c64-721b-46a9-9e43-a6eaf66295cb';
      mockProjectsRepository.findProject.mockResolvedValue(
        mockProjects.find((project) => project.id === id),
      );
      const project = await service.getProjectById(id);
      expect(project).toEqual({
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
      });
    });
  });

  describe('getProjectByStudentId', () => {
    it('should return project', async () => {
      const studentId = '8de3463b-a8c6-4525-b9f3-4d5dd8699c15';
      mockProjectsRepository.findProject.mockResolvedValue(
        mockProjects.find((project) => project.studentId === studentId),
      );
      const project = await service.getProjectByStudentId(studentId);
      expect(project).toEqual({
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
      });
    });
  });

  describe('createProject', () => {
    it('should return project', async () => {
      const newProjects: IProject = {
        id: 'a2ef4211-bc63-4928-b347-6cecf1b72b25',
        title: 'Title',
        summary: 'Summary',
        field: {
          id: '5e000912-9c9a-4445-a980-02c237af4775',
          title: 'Software Engineering',
          createdAt: new Date('2020-01-01'),
          updatedAt: new Date('2020-01-01'),
        },
        specializations: [],
        studentId: '8de3463b-a8c6-4525-b9f3-4d5dd8699c15',
        createdAt: new Date('2020-01-01'),
        updatedAt: new Date('2020-01-01'),
      };
      const payload: ICreateProjectPayload = {
        title: 'Title',
        summary: 'Summary',
        field: { id: '5e000912-9c9a-4445-a980-02c237af4775' },
        specializations: [],
        student: { id: '8de3463b-a8c6-4525-b9f3-4d5dd8699c15' },
      };

      mockProjectsRepository.createProject.mockResolvedValue(newProjects);
      const project = await service.createProject(payload);

      expect(project).toEqual(newProjects);
      expect(payload.title).toBe(project.title);
      expect(payload.student.id).toBe(project.studentId);
    });
  });

  describe('updateProjectById', () => {
    it('should return project', async () => {
      const id = 'ade23c64-721b-46a9-9e43-a6eaf66295cb';
      mockProjectsRepository.updateProject.mockResolvedValue(
        mockProjects.find((project) => project.id === id),
      );
      const project = await service.updateProjectById(id, {});
      expect(project).toEqual({
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
      });
    });

    it('should throw project not found exception', async () => {
      const id = 'cdf23c64-721b-46a9-9e43-a6eaf66295cb';
      mockProjectsRepository.updateProject.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          '',
          PrismaErrorCode.NOT_FOUND,
          '',
        ),
      );
      try {
        await service.updateProjectById(id, {});
      } catch (error) {
        expect(error).toEqual(new RpcException(ProjectsCode.PROJECT_NOT_FOUND));
      }
    });
  });

  describe('deleteProjectById', () => {
    it('should return undefined', async () => {
      const id = 'ade23c64-721b-46a9-9e43-a6eaf66295cb';
      mockProjectsRepository.deleteProject.mockResolvedValue(undefined);
      const response = await service.deleteProjectById(id);
      expect(response).toBeUndefined();
    });

    it('should throw project not found exception', async () => {
      const id = 'cdf23c64-721b-46a9-9e43-a6eaf66295cb';
      mockProjectsRepository.deleteProject.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          '',
          PrismaErrorCode.NOT_FOUND,
          '',
        ),
      );
      try {
        await service.deleteProjectById(id);
      } catch (error) {
        expect(error).toEqual(new RpcException(ProjectsCode.PROJECT_NOT_FOUND));
      }
    });
  });
});
