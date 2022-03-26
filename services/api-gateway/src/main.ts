import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  ApiResponseInterceptor,
  HttpExceptionFilter,
} from '@sv-connect/common';
import cookieParser from 'cookie-parser';
import config from 'config';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { initSwaggerDocs } from './lib/swagger-helper.lib';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix(config.get('service.basePath'));

  app.use(cookieParser());
  app.use(helmet());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  initSwaggerDocs(app);

  await app.listen(config.get('server.port'));
}
bootstrap()
  .then(() => {
    Logger.log(
      `Api ${config.get('service.name')} is listening on port ${config.get(
        'server.port',
      )}`,
    );
  })
  .catch((err) => {
    Logger.error(err);
  });
