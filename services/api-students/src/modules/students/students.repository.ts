import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@sv-connect/common';
import {
  ICreateStudentPayload,
  IStudent,
  IUpdateStudentPayload,
} from '@sv-connect/domain';
import to from 'await-to-js';

@Injectable()
export class StudentsRepository {
  private readonly defaultSelect: Prisma.StudentSelect = {
    id: true,
    accountId: true,
    supervisorId: true,
    createdAt: true,
    updatedAt: true,
    account: false,
    invitations: false,
    project: false,
    supervisor: false,
  };

  constructor(private readonly prisma: PrismaService) {}

  async findStudents(): Promise<IStudent[]> {
    const [err, result] = await to(
      this.prisma.student.findMany({
        select: this.defaultSelect,
      }),
    );
    return result as IStudent[];
  }

  async findStudent(by: Prisma.StudentWhereUniqueInput): Promise<IStudent> {
    const [err, result] = await to(
      this.prisma.student.findUnique({
        where: {
          id: by.id,
          accountId: by.accountId,
        },
        select: this.defaultSelect,
      }),
    );
    return result as IStudent;
  }

  async createStudent(payload: ICreateStudentPayload): Promise<IStudent> {
    const [err, result] = await to(
      this.prisma.student.create({
        data: {
          account: { connect: payload.account },
          supervisor: { connect: payload.supervisor },
        },
        select: this.defaultSelect,
      }),
    );
    return result as IStudent;
  }

  async updateStudent(
    by: Prisma.StudentWhereUniqueInput,
    payload: IUpdateStudentPayload,
  ): Promise<IStudent> {
    const [err, result] = await to(
      this.prisma.student.update({
        where: {
          id: by.id,
          accountId: by.accountId,
        },
        data: {
          supervisor: { connect: payload.supervisor },
        },
        select: this.defaultSelect,
      }),
    );
    return result as IStudent;
  }
}
