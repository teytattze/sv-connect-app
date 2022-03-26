import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@sv-connect/common';
import {
  ICreateStudentPayload,
  IStudent,
  IUpdateStudentPayload,
} from '@sv-connect/domain';

@Injectable()
export class StudentsRepository {
  private readonly defaultSelect: Prisma.StudentSelect = {
    id: true,
    accountId: true,
    supervisorId: true,
    createdAt: true,
    updatedAt: true,
    account: false,
    project: false,
    invitations: false,
    supervisor: false,
  };

  constructor(private readonly prisma: PrismaService) {}

  async findStudents(): Promise<IStudent[]> {
    return (await this.prisma.student.findMany({
      select: this.defaultSelect,
    })) as IStudent[];
  }

  async findStudent(by: Prisma.StudentWhereUniqueInput): Promise<IStudent> {
    return (await this.prisma.student.findUnique({
      where: {
        id: by.id,
        accountId: by.accountId,
      },
      select: this.defaultSelect,
    })) as IStudent;
  }

  async createStudent(payload: ICreateStudentPayload): Promise<IStudent> {
    return (await this.prisma.student.create({
      data: {
        account: { connect: payload.account },
        supervisor: { connect: payload.supervisor },
      },
      select: this.defaultSelect,
    })) as IStudent;
  }

  async updateStudent(
    by: Prisma.StudentWhereUniqueInput,
    payload: IUpdateStudentPayload,
  ): Promise<IStudent> {
    return (await this.prisma.student.update({
      where: {
        id: by.id,
        accountId: by.accountId,
      },
      data: {
        supervisor: {
          connect: payload.supervisor?.connect,
        },
      },
      select: this.defaultSelect,
    })) as IStudent;
  }

  async deleteStudent(by: Prisma.StudentWhereUniqueInput): Promise<void> {
    await this.prisma.student.delete({
      where: {
        id: by.id,
        accountId: by.accountId,
      },
    });
  }
}
