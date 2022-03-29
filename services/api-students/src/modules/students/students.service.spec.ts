import { Provider } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import {
  ICreateStudentPayload,
  IStudent,
  PrismaErrorCode,
  StudentsCode,
} from '@sv-connect/domain';
import {
  mockStudents,
  mockStudentsRepository,
} from '../../mocks/students.mock';
import { StudentsRepository } from './students.repository';
import { StudentsService } from './students.service';

describe('StudentsService', () => {
  let service: StudentsService;
  const mockProviders: Provider[] = [
    {
      provide: StudentsRepository,
      useValue: mockStudentsRepository,
    },
  ];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [StudentsService, ...mockProviders],
    }).compile();
    service = await moduleRef.get<StudentsService>(StudentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  describe('indexStudents', () => {
    it('should return all students', async () => {
      mockStudentsRepository.findStudents.mockResolvedValue(mockStudents);
      const students = await service.indexStudents();
      expect(students).toEqual(mockStudents);
    });
  });

  describe('getStudentById', () => {
    it('should return student', async () => {
      const id = '1eb166d7-19a6-419d-92c2-9bc0ce39ae52';
      mockStudentsRepository.findStudent.mockResolvedValue(
        mockStudents.find((student) => student.id === id),
      );
      const student = await service.getStudentById(id);
      expect(student).toEqual({
        id: '1eb166d7-19a6-419d-92c2-9bc0ce39ae52',
        accountId: '1c16712b-9e6a-48c9-9b96-2f742173192c',
        supervisorId: null,
        createdAt: new Date('2020-01-01'),
        updatedAt: new Date('2020-01-01'),
      });
    });

    it('should throw student not found exception', async () => {
      const id = '3eb166d7-19a6-419d-92c2-9bc0ce39ae52';
      mockStudentsRepository.findStudent.mockResolvedValue(
        mockStudents.find((student) => student.id === id),
      );
      try {
        await service.getStudentById(id);
      } catch (error) {
        expect(error).toEqual(new RpcException(StudentsCode.STUDENT_NOT_FOUND));
      }
    });
  });

  describe('getStudentByAccountId', () => {
    it('should return student', async () => {
      const accountId = '1c16712b-9e6a-48c9-9b96-2f742173192c';
      mockStudentsRepository.findStudent.mockResolvedValue(
        mockStudents.find((student) => student.accountId === accountId),
      );
      const student = await service.getStudentByAccountId(accountId);
      expect(student).toEqual({
        id: '1eb166d7-19a6-419d-92c2-9bc0ce39ae52',
        accountId: '1c16712b-9e6a-48c9-9b96-2f742173192c',
        supervisorId: null,
        createdAt: new Date('2020-01-01'),
        updatedAt: new Date('2020-01-01'),
      });
    });

    it('should throw student not found exception', async () => {
      const accountId = '1d16712b-9e6a-48c9-9b96-2f742173192c';
      mockStudentsRepository.findStudent.mockResolvedValue(
        mockStudents.find((student) => student.accountId === accountId),
      );
      try {
        await service.getStudentByAccountId(accountId);
      } catch (error) {
        expect(error).toEqual(new RpcException(StudentsCode.STUDENT_NOT_FOUND));
      }
    });
  });

  describe('createStudent', () => {
    it('should return student', async () => {
      const newStudents: IStudent = {
        id: '640226d9-0ea2-4001-a23c-24de62af2e11',
        accountId: '1c16712b-9e6a-48c9-9b96-2f742173192c',
        supervisorId: null,
        createdAt: new Date('2020-01-01'),
        updatedAt: new Date('2020-01-01'),
      };
      const payload: ICreateStudentPayload = {
        account: { id: '1c16712b-9e6a-48c9-9b96-2f742173192c' },
      };

      mockStudentsRepository.createStudent.mockResolvedValue(newStudents);
      const student = await service.createStudent(payload);
      expect(student).toEqual(newStudents);
      expect(payload.account.id).toBe(newStudents.accountId);
    });
  });

  describe('updateStudentById', () => {
    it('should return student', async () => {
      const id = '1eb166d7-19a6-419d-92c2-9bc0ce39ae52';
      mockStudentsRepository.updateStudent.mockResolvedValue(
        mockStudents.find((student) => student.id === id),
      );
      const student = await service.updateStudentById(id, {});
      expect(student).toEqual({
        id: '1eb166d7-19a6-419d-92c2-9bc0ce39ae52',
        accountId: '1c16712b-9e6a-48c9-9b96-2f742173192c',
        supervisorId: null,
        createdAt: new Date('2020-01-01'),
        updatedAt: new Date('2020-01-01'),
      });
    });

    it('should throw student not found exception', async () => {
      const id = '3eb166d7-19a6-419d-92c2-9bc0ce39ae52';
      mockStudentsRepository.updateStudent.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          '',
          PrismaErrorCode.NOT_FOUND,
          '',
        ),
      );
      try {
        await service.updateStudentById(id, {});
      } catch (error) {
        expect(error).toEqual(new RpcException(StudentsCode.STUDENT_NOT_FOUND));
      }
    });
  });

  describe('updateStudentByAccountId', () => {
    it('should return student', async () => {
      const accountId = '1c16712b-9e6a-48c9-9b96-2f742173192c';
      mockStudentsRepository.updateStudent.mockResolvedValue(
        mockStudents.find((student) => student.accountId === accountId),
      );
      const student = await service.updateStudentByAccountId(accountId, {});
      expect(student).toEqual({
        id: '1eb166d7-19a6-419d-92c2-9bc0ce39ae52',
        accountId: '1c16712b-9e6a-48c9-9b96-2f742173192c',
        supervisorId: null,
        createdAt: new Date('2020-01-01'),
        updatedAt: new Date('2020-01-01'),
      });
    });

    it('should throw student not found exception', async () => {
      const accountId = '1d16712b-9e6a-48c9-9b96-2f742173192c';
      mockStudentsRepository.updateStudent.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          '',
          PrismaErrorCode.NOT_FOUND,
          '',
        ),
      );
      try {
        await service.updateStudentByAccountId(accountId, {});
      } catch (error) {
        expect(error).toEqual(new RpcException(StudentsCode.STUDENT_NOT_FOUND));
      }
    });
  });

  describe('deleteStudentById', () => {
    it('should return undefined', async () => {
      const id = 'eb166d7-19a6-419d-92c2-9bc0ce39ae52';
      mockStudentsRepository.deleteStudent.mockResolvedValue(undefined);
      const student = await service.deleteStudentById(id);
      expect(student).toBeUndefined();
    });

    it('should throw student not found exception', async () => {
      const id = '3eb166d7-19a6-419d-92c2-9bc0ce39ae52';
      mockStudentsRepository.deleteStudent.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          '',
          PrismaErrorCode.NOT_FOUND,
          '',
        ),
      );
      try {
        await service.deleteStudentById(id);
      } catch (error) {
        expect(error).toEqual(new RpcException(StudentsCode.STUDENT_NOT_FOUND));
      }
    });
  });
});
