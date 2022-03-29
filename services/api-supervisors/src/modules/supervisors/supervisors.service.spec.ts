import { Provider } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import {
  ICreateSupervisorPayload,
  IIndexSupervisorsByPayload,
  ISupervisor,
  PrismaErrorCode,
  SupervisorsCode,
} from '@sv-connect/domain';
import {
  mockSupervisors,
  mockSupervisorsRepository,
} from '../../mocks/supervisors.mock';
import { SupervisorsRepository } from './supervisors.repository';
import { SupervisorsService } from './supervisors.service';

describe('SupervisorsService', () => {
  let service: SupervisorsService;
  const mockProviders: Provider[] = [
    {
      provide: SupervisorsRepository,
      useValue: mockSupervisorsRepository,
    },
  ];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SupervisorsService, ...mockProviders],
    }).compile();
    service = await moduleRef.get<SupervisorsService>(SupervisorsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  describe('indexSupervisors', () => {
    it('should return all supervisors', async () => {
      mockSupervisorsRepository.findSupervisors.mockResolvedValue(
        mockSupervisors,
      );
      const supervisors = await service.indexSupervisors();
      expect(supervisors).toEqual(mockSupervisors);
    });

    it('should return supervisors with capacity more than or equal to 5', async () => {
      const indexPayload: IIndexSupervisorsByPayload = {
        minCapacity: 5,
      };
      mockSupervisorsRepository.findSupervisors.mockResolvedValue(
        mockSupervisors.filter(
          (supervisor) => supervisor.capacity >= indexPayload.minCapacity,
        ),
      );
      const supervisors = await service.indexSupervisors(indexPayload);
      expect(supervisors).toEqual([
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
      ]);
    });

    it('should return supervisors with capacity less than or equal to 4', async () => {
      const indexPayload: IIndexSupervisorsByPayload = {
        maxCapacity: 4,
      };
      mockSupervisorsRepository.findSupervisors.mockResolvedValue(
        mockSupervisors.filter(
          (supervisor) => supervisor.capacity <= indexPayload.maxCapacity,
        ),
      );
      const supervisors = await service.indexSupervisors(indexPayload);
      expect(supervisors).toEqual([
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
      ]);
    });

    it('should return supervisors with software engineering field', async () => {
      const indexPayload: IIndexSupervisorsByPayload = {
        fieldId: '5e000912-9c9a-4445-a980-02c237af4775',
      };
      mockSupervisorsRepository.findSupervisors.mockResolvedValue(
        mockSupervisors.filter(
          (supervisor) => supervisor.field.id === indexPayload.fieldId,
        ),
      );
      const supervisors = await service.indexSupervisors(indexPayload);
      expect(supervisors).toEqual([
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
      ]);
    });
  });

  describe('getSupervisorById', () => {
    it('should return supervisor', async () => {
      const id = '40ce0c66-d28b-41e8-8b98-0712167eebbb';
      mockSupervisorsRepository.findSupervisor.mockResolvedValue(
        mockSupervisors.find((supervisor) => supervisor.id === id),
      );
      const supervisor = await service.getSupervisorById(id);
      expect(supervisor).toEqual({
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
      });
    });

    it('should throw supervisor not found exception', async () => {
      const id = '50ce0c66-d28b-41e8-8b98-0712167eebbb';
      mockSupervisorsRepository.findSupervisor.mockResolvedValue(
        mockSupervisors.find((supervisor) => supervisor.id === id),
      );
      try {
        await service.getSupervisorById(id);
      } catch (error) {
        expect(error).toEqual(
          new RpcException(SupervisorsCode.SUPERVISOR_NOT_FOUND),
        );
      }
    });
  });

  describe('getSupervisorByAccountId', () => {
    it('should return supervisor', async () => {
      const accountId = '22e57dce-e066-4f7e-9803-97f0f60c3c60';
      mockSupervisorsRepository.findSupervisor.mockResolvedValue(
        mockSupervisors.find(
          (supervisor) => supervisor.accountId === accountId,
        ),
      );
      const supervisor = await service.getSupervisorByAccountId(accountId);
      expect(supervisor).toEqual({
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
      });
    });

    it('should throw supervisor not found exception', async () => {
      const accountId = '32e57dce-e066-4f7e-9803-97f0f60c3c60';
      mockSupervisorsRepository.findSupervisor.mockResolvedValue(
        mockSupervisors.find(
          (supervisor) => supervisor.accountId === accountId,
        ),
      );
      try {
        await service.getSupervisorByAccountId(accountId);
      } catch (error) {
        expect(error).toEqual(
          new RpcException(SupervisorsCode.SUPERVISOR_NOT_FOUND),
        );
      }
    });
  });

  describe('createSupervisor', () => {
    it('should return supervisor', async () => {
      const newSupervisor: ISupervisor = {
        id: '640226d9-0ea2-4001-a23c-24de62af2e11',
        capacity: 2,
        accountId: '1c16712b-9e6a-48c9-9b96-2f742173192c',
        field: {
          id: '67e70247-3a03-462f-8569-ed813202f3ab',
          title: 'Artificial Intelligence',
          createdAt: new Date('2020-01-01'),
          updatedAt: new Date('2020-01-01'),
        },
        specializations: [],
        createdAt: new Date('2020-01-01'),
        updatedAt: new Date('2020-01-01'),
      };
      const payload: ICreateSupervisorPayload = {
        account: { id: '1c16712b-9e6a-48c9-9b96-2f742173192c' },
        field: { id: '67e70247-3a03-462f-8569-ed813202f3ab' },
        specializations: [],
      };

      mockSupervisorsRepository.createSupervisor.mockResolvedValue(
        newSupervisor,
      );
      const supervisor = await service.createSupervisor(payload);
      expect(supervisor).toEqual(newSupervisor);
      expect(payload.account.id).toBe(newSupervisor.accountId);
    });
  });

  describe('updateSupervisorById', () => {
    it('should return supervisor', async () => {
      const id = '40ce0c66-d28b-41e8-8b98-0712167eebbb';
      mockSupervisorsRepository.updateSupervisor.mockResolvedValue(
        mockSupervisors.find((supervisor) => supervisor.id === id),
      );
      const supervisor = await service.updateSupervisorById(id, {});
      expect(supervisor).toEqual({
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
      });
    });

    it('should throw supervisor not found exception', async () => {
      const id = '50ce0c66-d28b-41e8-8b98-0712167eebbb';
      mockSupervisorsRepository.updateSupervisor.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          '',
          PrismaErrorCode.NOT_FOUND,
          '',
        ),
      );
      try {
        await service.updateSupervisorById(id, {});
      } catch (error) {
        expect(error).toEqual(
          new RpcException(SupervisorsCode.SUPERVISOR_NOT_FOUND),
        );
      }
    });
  });

  describe('updateSupervisorByAccountId', () => {
    it('should return supervisor', async () => {
      const accountId = '22e57dce-e066-4f7e-9803-97f0f60c3c60';
      mockSupervisorsRepository.updateSupervisor.mockResolvedValue(
        mockSupervisors.find(
          (supervisor) => supervisor.accountId === accountId,
        ),
      );
      const supervisor = await service.updateSupervisorByAccountId(
        accountId,
        {},
      );
      expect(supervisor).toEqual({
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
      });
    });

    it('should throw supervisor not found exception', async () => {
      const accountId = '32e57dce-e066-4f7e-9803-97f0f60c3c6';
      mockSupervisorsRepository.updateSupervisor.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          '',
          PrismaErrorCode.NOT_FOUND,
          '',
        ),
      );
      try {
        await service.updateSupervisorByAccountId(accountId, {});
      } catch (error) {
        expect(error).toEqual(
          new RpcException(SupervisorsCode.SUPERVISOR_NOT_FOUND),
        );
      }
    });
  });

  describe('deleteSupervisorById', () => {
    it('should return undefined', async () => {
      const id = '40ce0c66-d28b-41e8-8b98-0712167eebbb';
      mockSupervisorsRepository.deleteSupervisor.mockResolvedValue(undefined);
      const response = await service.deleteSupervisorById(id);
      expect(response).toBeUndefined();
    });

    it('should throw supervisor not found exception', async () => {
      const id = '50ce0c66-d28b-41e8-8b98-0712167eebbb';
      mockSupervisorsRepository.deleteSupervisor.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          '',
          PrismaErrorCode.NOT_FOUND,
          '',
        ),
      );
      try {
        await service.deleteSupervisorById(id);
      } catch (error) {
        expect(error).toEqual(
          new RpcException(SupervisorsCode.SUPERVISOR_NOT_FOUND),
        );
      }
    });
  });
});
