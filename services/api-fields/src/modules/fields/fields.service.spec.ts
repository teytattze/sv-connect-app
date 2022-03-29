import { Provider } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { FieldsCode, PrismaErrorCode } from '@sv-connect/domain';
import { mockFieldsRepository, mockFields } from '../../mocks/fields.mock';
import { FieldsRepository } from './fields.repository';
import { FieldsService } from './fields.service';

describe('FieldsService', () => {
  let service: FieldsService;
  const mockProviders: Provider[] = [
    {
      provide: FieldsRepository,
      useValue: mockFieldsRepository,
    },
  ];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [FieldsService, ...mockProviders],
    }).compile();
    service = await moduleRef.get<FieldsService>(FieldsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  describe('indexFields', () => {
    it('should return all fields', async () => {
      mockFieldsRepository.findFields.mockResolvedValue(mockFields);
      const fields = await service.indexFields();
      expect(fields).toEqual(mockFields);
    });
  });

  describe('getFieldById', () => {
    it('should return a field by id', async () => {
      const id = '67e70247-3a03-462f-8569-ed813202f3ab';
      mockFieldsRepository.findField.mockResolvedValue(
        mockFields.find((field) => field.id === id),
      );
      const field = await service.getFieldById(id);
      expect(field).toEqual({
        id: '67e70247-3a03-462f-8569-ed813202f3ab',
        title: 'Artificial Intelligence',
        specializations: [],
        createdAt: new Date('2020-01-01'),
        updatedAt: new Date('2020-01-01'),
      });
    });

    it('should throw not found error', async () => {
      const id = '67e70247-4a04-462f-8569-ed813202f3ab';
      mockFieldsRepository.findField.mockResolvedValue(
        mockFields.find((field) => field.id === id),
      );
      try {
        await service.getFieldById(id);
      } catch (error) {
        expect(error).toEqual(new RpcException(FieldsCode.FIELD_NOT_FOUND));
      }
    });
  });

  describe('createField', () => {
    it('should create a field', async () => {
      const newField = {
        id: '67e7ab34-3a03-462f-8569-ed813202f3ab',
        title: 'Mathematics',
        specializations: [],
        createdAt: new Date('2020-01-01'),
        updatedAt: new Date('2020-01-01'),
      };
      const payload = {
        title: 'Mathematics',
      };

      jest.spyOn(service, 'isFieldExistsByTitle').mockResolvedValue(false);
      mockFieldsRepository.createField.mockResolvedValue(newField);
      const field = await service.createField(newField);

      expect(field).toEqual(newField);
      expect(payload.title).toBe(field.title);
    });

    it('should throw field exists exception', async () => {
      const payload = {
        title: 'Software Engineering',
      };
      jest.spyOn(service, 'isFieldExistsByTitle').mockResolvedValue(true);
      try {
        await service.createField(payload);
      } catch (error) {
        expect(error).toEqual(new RpcException(FieldsCode.FIELD_EXISTS));
      }
    });
  });

  describe('updateFieldById', () => {
    it('should update and return the field', async () => {
      const id = '60016ae0-f5ac-46e3-b57d-b3c8065b34bb';
      mockFieldsRepository.updateField.mockResolvedValue(
        mockFields.find((field) => field.id === id),
      );
      const field = await service.updateFieldById(id, {});

      expect(field).toEqual({
        id: '60016ae0-f5ac-46e3-b57d-b3c8065b34bb',
        title: 'Marketing',
        specializations: [],
        createdAt: new Date('2020-01-01'),
        updatedAt: new Date('2020-01-01'),
      });
    });

    it('should throw field not found exception', async () => {
      const id = '67e70247-4a04-462f-8569-ed813202f3ab';
      mockFieldsRepository.updateField.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          '',
          PrismaErrorCode.NOT_FOUND,
          '',
        ),
      );
      try {
        await service.updateFieldById(id, {});
      } catch (error) {
        expect(error).toEqual(new RpcException(FieldsCode.FIELD_NOT_FOUND));
      }
    });

    it('should throw field exists exception', async () => {
      const id = '67e70247-4a04-462f-8569-ed813202f3ab';
      mockFieldsRepository.updateField.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          '',
          PrismaErrorCode.UNIQUE_CONSTRAINT,
          '',
        ),
      );
      try {
        await service.updateFieldById(id, {});
      } catch (error) {
        expect(error).toEqual(new RpcException(FieldsCode.FIELD_EXISTS));
      }
    });
  });

  describe('deleteFieldById', () => {
    it('should delete and return void', async () => {
      const id = '60016ae0-f5ac-46e3-b57d-b3c8065b34bb';
      mockFieldsRepository.deleteField.mockResolvedValue(undefined);
      const field = await service.deleteFieldById(id);
      expect(field).toBeUndefined();
    });

    it('should throw field not found exception', async () => {
      const id = '67e70247-4a04-462f-8569-ed813202f3ab';
      mockFieldsRepository.deleteField.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          '',
          PrismaErrorCode.NOT_FOUND,
          '',
        ),
      );
      try {
        await service.deleteFieldById(id);
      } catch (error) {
        expect(error).toEqual(new RpcException(FieldsCode.FIELD_NOT_FOUND));
      }
    });
  });

  describe('isFieldExistsByTitle', () => {
    it('should return true', async () => {
      const title = 'Marketing';
      mockFieldsRepository.findField.mockResolvedValue(
        mockFields.find((field) => field.title === title),
      );
      const isExisted = await service.isFieldExistsByTitle(title);
      expect(isExisted).toBe(true);
    });

    it('should return false', async () => {
      const title = 'International Business';
      mockFieldsRepository.findField.mockResolvedValue(
        mockFields.find((field) => field.title === title),
      );
      const isExisted = await service.isFieldExistsByTitle(title);
      expect(isExisted).toBe(false);
    });
  });
});
