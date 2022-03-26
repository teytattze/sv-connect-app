import { Module } from '@nestjs/common';
import { ProjectsModule } from '../projects/projects.module';
import { StudentsModule } from '../students/students.module';
import { SupervisorsModule } from '../supervisors/supervisors.module';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';

@Module({
  imports: [ProjectsModule, StudentsModule, SupervisorsModule],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchesModule {}
