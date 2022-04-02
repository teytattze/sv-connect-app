import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  HttpExceptionFilter,
  HttpResponseInterceptor,
} from '@sv-connect/common';
import bodyParser from 'body-parser';
import config from 'config';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import httpContext from 'express-http-context';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

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

  await app.listen(config.get('server.port'));
}
bootstrap()
  .then(() => {
    Logger.log(
      `${config.get('service.name')} is serving on PORT ${config.get(
        'server.port',
      )}...`,
    );
  })
  .catch((err) => {
    Logger.error(err);
  });
