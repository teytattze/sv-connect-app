import { Module } from '@nestjs/common';
import { PrismaModule } from '@sv-connect/common';
import config from 'config';
import { SupervisorsModule } from './modules/supervisors/supervisors.module';
import 'dotenv/config';

@Module({
  imports: [
    PrismaModule.register({
      type: config.get('db.type'),
      username: config.get('db.username'),
      password: config.get('db.password'),
      host: config.get('db.host'),
      port: config.get('db.port'),
      database: config.get('db.database'),
      property: config.get('db.property'),
    }),
    SupervisorsModule,
  ],
})
export class AppModule {}
