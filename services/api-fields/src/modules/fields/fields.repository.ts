import { Injectable } from '@nestjs/common';
import { ICreateFieldPayload, IField } from '@sv-connect/domain';
import { PrismaService } from '@sv-connect/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class FieldsRepository {
  private readonly defaultSelect: Prisma.FieldSelect = {
    id: true,
    title: true,
    createdAt: true,
    updatedAt: true,
    projects: false,
    specializations: false,
    supervisors: false,
  };

  constructor(private readonly prisma: PrismaService) {}

  async createField(payload: ICreateFieldPayload): Promise<IField> {
    try {
      return (await this.prisma.field.create({
        data: {
          title: payload.title,
        },
        select: this.defaultSelect,
      })) as IField;
    } catch (err) {}
  }
}
