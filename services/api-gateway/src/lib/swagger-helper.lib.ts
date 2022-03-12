import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as fs from 'fs';
import config from 'config';
import 'dotenv/config';

export const initSwaggerDocs = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('SV Connect API')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, swaggerConfig, options);
  writeSwaggerJson(config.get('swagger.docsPath'), document);
  SwaggerModule.setup(`docs${config.get('service.basePath')}`, app, document);
};

export const writeSwaggerJson = (path: string, document: OpenAPIObject) => {
  fs.writeFileSync(path, JSON.stringify(document, null, 2), {
    encoding: 'utf8',
  });
};
