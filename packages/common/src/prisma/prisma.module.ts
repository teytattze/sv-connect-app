import { DynamicModule, Module } from '@nestjs/common';
import { PRISMA_OPTIONS } from './prisma.const';
import { IPrismaModuleOptions } from './prisma.interface';
import { PrismaService } from './prisma.service';

@Module({})
export class PrismaModule {
  public static register(options: IPrismaModuleOptions): DynamicModule {
    return {
      module: PrismaModule,
      providers: [
        {
          provide: PRISMA_OPTIONS,
          useValue: options,
        },
        PrismaService,
      ],
      exports: [PrismaService],
      global: true,
    };
  }
}
