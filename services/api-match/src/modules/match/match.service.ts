import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  IMatch,
  IMatchSelectedStudentsPayload,
  IProject,
  IStudentWithProject,
  ISupervisor,
} from '@sv-connect/domain';
import to from 'await-to-js';
import { ProjectsService } from '../projects/projects.service';
import { StudentsService } from '../students/students.service';
import { SupervisorsService } from '../supervisors/supervisors.service';

@Injectable()
export class MatchService {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly studentsService: StudentsService,
    private readonly supervisorsService: SupervisorsService,
  ) {}

  async matchSingleStudent(studentId: string): Promise<IMatch> {
    const student = await this.getStudentAndProject(studentId);
    const supervisors = await this.supervisorsService.indexSupervisor({
      fieldId: student.project.field.id,
      minCapacity: 1,
    });

    let highestPercentage = -1;
    let highestSupervisorIndex = -1;
    supervisors.forEach((supervisor, index) => {
      const percentage = this.calculateProjectAndSupervisorSimilarity(
        student.project,
        supervisor,
      );
      if (highestPercentage <= percentage) {
        highestPercentage = percentage;
        highestSupervisorIndex = index;
      }
    });

    if (highestSupervisorIndex == -1) {
      return {
        student,
        supervisor: null,
        isMatched: false,
        isConfirm: false,
      };
    }

    return {
      student,
      supervisor: supervisors[highestSupervisorIndex],
      isMatched: true,
      isConfirm: false,
    };
  }

  async matchSelectedStudent(
    payload: IMatchSelectedStudentsPayload,
  ): Promise<IMatch[]> {
    const { studentIds } = payload;
    const promises = studentIds.map((id) => this.getStudentAndProject(id));
    const students = await Promise.all(promises);
    const projectsByField = new Map<string, IProject[]>();
    students.forEach((student) => {
      const project = student.project;
      const fieldId = project.field.id;
      if (projectsByField.has(fieldId)) {
        projectsByField.get(fieldId).push(project);
      } else {
        projectsByField.set(fieldId, [project]);
      }
    });
    projectsByField.forEach((value, key) => {
      console.log(key, value);
    });

    return [
      {
        student: null,
        supervisor: null,
        isMatched: false,
        isConfirm: false,
      },
    ];
  }

  private async getStudentAndProject(
    studentId: string,
  ): Promise<IStudentWithProject> {
    const [studentError, student] = await to(
      this.studentsService.getStudentById(studentId),
    );
    if (studentError) throw new RpcException(studentError);
    const [projectError, project] = await to(
      this.projectsService.getProjectByStudentId(studentId),
    );
    if (projectError || !project) throw new RpcException(projectError);
    return { ...student, project };
  }

  private calculateProjectAndSupervisorSimilarity(
    project: IProject,
    supervisor: ISupervisor,
  ): number {
    const projectSpecsSet = new Set(
      project.specializations.map((spec) => spec.id),
    );
    const supervisorSpecsSet = new Set(
      supervisor.specializations.map((spec) => spec.id),
    );

    let count = 0;
    projectSpecsSet.forEach((spec) => {
      if (supervisorSpecsSet.has(spec)) count++;
    });

    return count / projectSpecsSet.size;
  }
}
