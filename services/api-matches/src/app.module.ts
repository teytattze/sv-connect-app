import { Module } from '@nestjs/common';
import {
  ClientsProvider,
  IClientsProviderOptions,
  PROJECTS_CLIENT,
  STUDENTS_CLIENT,
  SUPERVISORS_CLIENT,
} from '@sv-connect/common';
import config from 'config';
import { MatchesModule } from './modules/matches/matches.module';
import 'dotenv/config';

const clientsProviderOptions: IClientsProviderOptions[] = [
  {
    provide: PROJECTS_CLIENT,
    transport: config.get('microservices.projects'),
  },
  {
    provide: STUDENTS_CLIENT,
    transport: config.get('microservices.students'),
  },
  {
    provide: SUPERVISORS_CLIENT,
    transport: config.get('microservices.supervisors'),
  },
];

@Module({
  imports: [ClientsProvider.register(clientsProviderOptions), MatchesModule],
})
export class AppModule {}
