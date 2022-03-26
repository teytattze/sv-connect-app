import { Injectable } from '@nestjs/common';
import {
  ICreateFieldPayload,
  IField,
  IUpdateFieldPayload,
} from '@sv-connect/domain';
import { PrismaService } from '@sv-connect/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class FieldsRepository {
  private readonly defaultSelect: Prisma.FieldSelect = {
    id: true,
    title: true,
    specializations: true,
    createdAt: true,
    updatedAt: true,
    projects: false,
    supervisors: false,
  };

  constructor(private readonly prisma: PrismaService) {}

  async findFields(by?: Prisma.FieldWhereInput): Promise<IField[]> {
    return (await this.prisma.field.findMany({
      where: by,
      select: this.defaultSelect,
    })) as IField[];
  }

  async findField(by: Prisma.FieldWhereUniqueInput): Promise<IField> {
    return (await this.prisma.field.findUnique({
      where: {
        id: by.id,
        title: by.title,
      },
      select: this.defaultSelect,
    })) as IField;
  }

  async createField(payload: ICreateFieldPayload): Promise<IField> {
    return (await this.prisma.field.create({
      data: {
        title: payload.title,
        specializations: { connect: payload.specializations },
      },
      select: this.defaultSelect,
    })) as IField;
  }

  async updateField(
    by: Prisma.FieldWhereUniqueInput,
    payload: IUpdateFieldPayload,
  ): Promise<IField> {
    return (await this.prisma.field.update({
      where: { id: by.id, title: by.title },
      data: {
        title: payload.title,
        specializations: {
          connect: payload.specializations?.connect,
          disconnect: payload.specializations?.disconnect,
        },
      },
      select: this.defaultSelect,
    })) as IField;
  }

  async deleteField(by: Prisma.FieldWhereUniqueInput): Promise<void> {
    await this.prisma.field.delete({
      where: { id: by.id, title: by.title },
    });
  }
}
