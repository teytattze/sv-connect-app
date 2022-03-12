import { Module } from '@nestjs/common';
import { ProjectsModule } from '../projects/projects.module';
import { StudentsModule } from '../students/students.module';
import { SupervisorsModule } from '../supervisors/supervisors.module';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';

@Module({
  imports: [ProjectsModule, StudentsModule, SupervisorsModule],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
