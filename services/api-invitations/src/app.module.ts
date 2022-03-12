import { Module } from '@nestjs/common';
import {
  ClientsProvider,
  IClientsProviderOptions,
  INVITATIONS_CLIENT,
  PrismaModule,
} from '@sv-connect/common';
import config from 'config';
import { InvitationsModule } from './modules/invitations/invitations.module';
import 'dotenv/config';

const clientsProviderOptions: IClientsProviderOptions[] = [
  {
    provide: INVITATIONS_CLIENT,
    transport: config.get('microservices.invitations'),
  },
];

@Module({
  imports: [
    ClientsProvider.register(clientsProviderOptions),
    InvitationsModule,
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
