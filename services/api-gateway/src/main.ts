import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  HttpExceptionFilter,
  HttpResponseInterceptor,
} from '@sv-connect/common';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import config from 'config';
import helmet from 'helmet';
import httpContext from 'express-http-context';
import { AppModule } from './app.module';
import { initSwaggerDocs } from './lib/swagger-helper.lib';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix(config.get('service.basePath'));

  app.use(bodyParser.json());
  app.use(httpContext.middleware);
  app.use(cookieParser());
  app.use(helmet());

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HttpResponseInterceptor());
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
