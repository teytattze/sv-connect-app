import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { RpcExceptionFilter } from '@sv-connect/common';
import config from 'config';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    config.get('service.transporter'),
  );

  app.useGlobalFilters(new RpcExceptionFilter());
  await app.listen();
}
bootstrap()
  .then(() => {
    Logger.log(`${config.get('service.name')} is serving...`);
  })
  .catch((err) => {
    Logger.error(err);
  });
