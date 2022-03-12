import { Module } from '@nestjs/common';
import {
  ACCOUNTS_CLIENT,
  ClientsProvider,
  IClientsProviderOptions,
  SESSIONS_CLIENT,
} from '@sv-connect/common';
import config from 'config';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import 'dotenv/config';

const clientsProviderOptions: IClientsProviderOptions[] = [
  {
    provide: ACCOUNTS_CLIENT,
    transport: config.get('microservices.accounts'),
  },
  {
    provide: SESSIONS_CLIENT,
    transport: config.get('microservices.sessions'),
  },
];

@Module({
  imports: [
    AuthenticationModule,
    ClientsProvider.register(clientsProviderOptions),
  ],
})
export class AppModule {}
