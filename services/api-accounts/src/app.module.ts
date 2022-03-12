import { Module } from '@nestjs/common';
import {
  ClientsProvider,
  IClientsProviderOptions,
  PrismaModule,
  SESSIONS_CLIENT,
} from '@sv-connect/common';
import config from 'config';
import { AccountsModule } from './modules/accounts/accounts.module';
import 'dotenv/config';

const clientsProviderOptions: IClientsProviderOptions[] = [
  {
    provide: SESSIONS_CLIENT,
    transport: config.get('microservices.sessions'),
  },
];

@Module({
  imports: [
    AccountsModule,
    ClientsProvider.register(clientsProviderOptions),
    PrismaModule.register({
      type: config.get('db.type'),
      username: config.get('db.username'),
      password: config.get('db.password'),
      host: config.get('db.host'),
      port: config.get('db.port'),
      database: config.get('db.database'),
      property: config.get('db.property'),
    }),
  ],
})
export class AppModule {}
