import { Provider } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaErrorCode, SpecializationsCode } from '@sv-connect/domain';
import {
  mockSpecializations,
  mockSpecializationsRepository,
} from '../../mocks/specializations.mock';
import { SpecializationsRepository } from './specializations.repository';
import { SpecializationsService } from './specializations.service';

describe('SpecializationsService', () => {
  let service: SpecializationsService;
  const mockProviders: Provider[] = [
    {
      provide: SpecializationsRepository,
      useValue: mockSpecializationsRepository,
    },
  ];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SpecializationsService, ...mockProviders],
    }).compile();
    service = await moduleRef.get<SpecializationsService>(
      SpecializationsService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  describe('indexSpecializations', () => {
    it('should return all specializations', async () => {
      mockSpecializationsRepository.findSpecializations.mockResolvedValue(
        mockSpecializations,
      );
      const specializations = await service.indexSpecializations();
      expect(specializations).toEqual(mockSpecializations);
    });
  });

  describe('getSpecializationById', () => {
    it('should return specialization', async () => {
      const id = '60016ae0-f5ac-46e3-b57d-b3c8065b34bb';
      mockSpecializationsRepository.findSpecialization.mockResolvedValue(
        mockSpecializations.find((spec) => spec.id === id),
      );
      const specialization = await service.getSpecializationById(id);
      expect(specialization).toEqual({
        id: '60016ae0-f5ac-46e3-b57d-b3c8065b34bb',
        title: 'Digital Advertising',
        fields: [],
        createdAt: new Date('2020-01-01'),
        updatedAt: new Date('2020-01-01'),
      });
    });

    it('should throw specialization not found exception', async () => {
      const id = '67e70247-3a03-462f-8569-ed813202f3ab';
      mockSpecializationsRepository.findSpecialization.mockResolvedValue(
        mockSpecializations.find((spec) => spec.id === id),
      );
      try {
        await service.getSpecializationById(id);
      } catch (error) {
        expect(error).toEqual(
          new RpcException(SpecializationsCode.SPECIALIZATION_NOT_FOUND),
        );
      }
    });
  });

  describe('createSpecialization', () => {
    it('should create a specialization', async () => {
      const newSpecialization = {
        id: '67e7ab34-3a03-462f-8569-ed813202f3ab',
        title: 'Distributed Systems',
        fields: [],
        createdAt: new Date('2020-01-01'),
        updatedAt: new Date('2020-01-01'),
      };
      const payload = {
        title: 'Distributed Systems',
      };

      jest
        .spyOn(service, 'isSpecializationExistsByTitle')
        .mockResolvedValue(false);
      mockSpecializationsRepository.createSpecialization.mockResolvedValue(
        newSpecialization,
      );
      const specialization = await service.createSpecialization(
        newSpecialization,
      );

      expect(specialization).toEqual(newSpecialization);
      expect(payload.title).toBe(specialization.title);
    });

    it('should throw specialization exists exception', async () => {
      const payload = {
        title: 'Digital Advertising',
      };

      jest
        .spyOn(service, 'isSpecializationExistsByTitle')
        .mockResolvedValue(true);

      try {
        await service.createSpecialization(payload);
      } catch (error) {
        expect(error).toEqual(
          new RpcException(SpecializationsCode.SPECIALIZATION_TITLE_EXISTS),
        );
      }
    });
  });

  describe('updateSpecializationById', () => {
    it('should update and return the specialization', async () => {
      const id = '60016ae0-f5ac-46e3-b57d-b3c8065b34bb';
      mockSpecializationsRepository.updateSpecialization.mockResolvedValue(
        mockSpecializations.find((spec) => spec.id === id),
      );
      const specialization = await service.updateSpecializationById(id, {});
      expect(specialization).toEqual({
        id: '60016ae0-f5ac-46e3-b57d-b3c8065b34bb',
        title: 'Digital Advertising',
        fields: [],
        createdAt: new Date('2020-01-01'),
        updatedAt: new Date('2020-01-01'),
      });
    });

    it('should throw specialization not found exception', async () => {
      const id = '67e70247-4a04-462f-8569-ed813202f3ab';
      mockSpecializationsRepository.updateSpecialization.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          '',
          PrismaErrorCode.NOT_FOUND,
          '',
        ),
      );
      try {
        await service.updateSpecializationById(id, {});
      } catch (error) {
        expect(error).toEqual(
          new RpcException(SpecializationsCode.SPECIALIZATION_NOT_FOUND),
        );
      }
    });

    it('should throw specialization exists exception', async () => {
      const id = '67e70247-3a03-462f-8569-ed813202f3ab';
      mockSpecializationsRepository.updateSpecialization.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          '',
          PrismaErrorCode.UNIQUE_CONSTRAINT,
          '',
        ),
      );
      try {
        await service.updateSpecializationById(id, {});
      } catch (error) {
        expect(error).toEqual(
          new RpcException(SpecializationsCode.SPECIALIZATION_EXISTS),
        );
      }
    });
  });

  describe('deleteSpecializationById', () => {
    it('should delete and return undefined', async () => {
      const id = '60016ae0-f5ac-46e3-b57d-b3c8065b34bb';
      mockSpecializationsRepository.deleteSpecialization.mockResolvedValue(
        undefined,
      );
      const response = await service.deleteSpecializationById(id);
      expect(response).toBeUndefined();
    });

    it('should throw specialization not found exception', async () => {
      const id = '67e70247-4a04-462f-8569-ed813202f3ab';
      mockSpecializationsRepository.deleteSpecialization.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          '',
          PrismaErrorCode.NOT_FOUND,
          '',
        ),
      );
      try {
        await service.deleteSpecializationById(id);
      } catch (error) {
        expect(error).toEqual(
          new RpcException(SpecializationsCode.SPECIALIZATION_NOT_FOUND),
        );
      }
    });
  });

  describe('isSpecializationExistsByTitle', () => {
    it('should return true', async () => {
      const title = 'Digital Advertising';
      mockSpecializationsRepository.findSpecialization.mockResolvedValue(
        mockSpecializations.find((field) => field.title === title),
      );
      const isExisted = await service.isSpecializationExistsByTitle(title);
      expect(isExisted).toBe(true);
    });

    it('should return false', async () => {
      const title = 'Distributed Systems';
      mockSpecializationsRepository.findSpecialization.mockResolvedValue(
        mockSpecializations.find((field) => field.title === title),
      );
      const isExisted = await service.isSpecializationExistsByTitle(title);
      expect(isExisted).toBe(false);
    });
  });
});
