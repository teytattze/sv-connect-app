import { Injectable } from '@nestjs/common';
import {
  ICreateProjectPayload,
  IProject,
  IUpdateProjectPayload,
} from '@sv-connect/domain';
import { PrismaService } from '@sv-connect/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectsRepository {
  private readonly defaultSelect: Prisma.ProjectSelect = {
    id: true,
    title: true,
    summary: true,
    studentId: true,
    field: true,
    specializations: true,
    createdAt: true,
    updatedAt: true,
    fieldId: false,
    student: false,
  };

  constructor(private readonly prisma: PrismaService) {}

  async findProjects(): Promise<IProject[]> {
    return (await this.prisma.project.findMany({
      select: this.defaultSelect,
    })) as IProject[];
  }

  async findProject(by: Prisma.ProjectWhereUniqueInput): Promise<IProject> {
    return (await this.prisma.project.findUnique({
      where: {
        id: by.id,
        studentId: by.studentId,
      },
      select: this.defaultSelect,
    })) as IProject;
  }

  async createProject(payload: ICreateProjectPayload): Promise<IProject> {
    return (await this.prisma.project.create({
      data: {
        title: payload.title,
        summary: payload.summary,
        field: { connect: payload.field },
        specializations: { connect: payload.specializations },
        student: { connect: payload.student },
      },
      select: this.defaultSelect,
    })) as IProject;
  }

  async updateProject(
    by: Prisma.ProjectWhereUniqueInput,
    payload: IUpdateProjectPayload,
  ): Promise<IProject> {
    return (await this.prisma.project.update({
      where: {
        id: by.id,
        studentId: by.studentId,
      },
      data: {
        title: payload.title,
        summary: payload.summary,
        field: {
          connect: payload.field.connect,
          disconnect: payload.field.disconnect,
        },
        specializations: {
          connect: payload.specializations.connect,
          disconnect: payload.specializations.disconnect,
        },
      },
      select: this.defaultSelect,
    })) as IProject;
  }

  async deleteProject(by: Prisma.ProjectWhereUniqueInput): Promise<void> {
    await this.prisma.project.delete({
      where: {
        id: by.id,
        studentId: by.studentId,
      },
    });
  }
}
