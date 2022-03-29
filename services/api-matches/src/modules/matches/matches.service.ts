import { Injectable } from '@nestjs/common';
import {
  IMatch,
  IMatchesService,
  IMatchSelectedStudentsAndSupervisorsPayload,
  IMatchSelectedStudentsPayload,
  IMatchSingleStudentPayload,
  IStudentWithProject,
  ISupervisor,
} from '@sv-connect/domain';
import { ProjectsService } from '../projects/projects.service';
import { StudentsService } from '../students/students.service';
import { SupervisorsService } from '../supervisors/supervisors.service';
import { MatchesHelper } from './matches.helper';

@Injectable()
export class MatchesService implements IMatchesService {
  constructor(
    private readonly matchesHelper: MatchesHelper,
    private readonly projectsService: ProjectsService,
    private readonly studentsService: StudentsService,
    private readonly supervisorsService: SupervisorsService,
  ) {}

  async matchSingleStudent({
    studentId,
  }: IMatchSingleStudentPayload): Promise<IMatch> {
    const student = await this.getStudentWithProjectByStudentId(studentId);
    const { data: supervisors } = await this.supervisorsService.indexSupervisor(
      { fieldId: student.project.field.id, minCapacity: 1 },
    );

    let highestPercentage = -1;
    let highestSupervisorIndex = -1;
    supervisors.forEach((supervisor, index) => {
      const percentage =
        this.matchesHelper.calculateProjectAndSupervisorSimilarity(
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
        isApproved: false,
      };
    }

    return {
      student,
      supervisor: supervisors[highestSupervisorIndex],
      isMatched: true,
      isApproved: false,
    };
  }

  async matchSelectedStudents({
    studentIds,
  }: IMatchSelectedStudentsPayload): Promise<IMatch[]> {
    const students = await this.getStudentWithProjectsByStudentIds(studentIds);
    const studentsByField =
      this.matchesHelper.makeStudentWithProjectsByFieldMap(students);

    const fieldIds = Object.keys(studentsByField);
    const supervisors = await this.getSupervisorsByFieldIds(fieldIds);
    const supervisorsByField =
      this.matchesHelper.makeSupervisorsByFieldMap(supervisors);

    const matchResult = this.matchStudentsAndSupervisors(
      studentsByField,
      supervisorsByField,
    );

    return matchResult;
  }

  async matchSelectedStudentsAndSupervisors({
    studentIds,
    supervisorIds,
  }: IMatchSelectedStudentsAndSupervisorsPayload): Promise<IMatch[]> {
    const students = await this.getStudentWithProjectsByStudentIds(studentIds);
    const supervisors = await this.getSuperviorsBySupervisorIds(supervisorIds);

    const studentsByField =
      this.matchesHelper.makeStudentWithProjectsByFieldMap(students);
    const supervisorsByField =
      this.matchesHelper.makeSupervisorsByFieldMap(supervisors);

    const matchResult = this.matchStudentsAndSupervisors(
      studentsByField,
      supervisorsByField,
    );

    return matchResult;
  }

  private matchStudentsAndSupervisors(
    studentsByField: Map<string, IStudentWithProject[]>,
    supervisorsByField: Map<string, ISupervisor[]>,
  ): IMatch[] {
    const fieldIds = Object.keys(studentsByField);

    const matchResult: IMatch[] = [];
    for (const fieldId of fieldIds) {
      const supervisors = supervisorsByField[fieldId];
      const students = studentsByField[fieldId];

      students.forEach((student) => {
        const project = student.project;

        let highestPercentage = -1;
        let highestSupervisorIndex = -1;
        supervisors.forEach((supervisor, index) => {
          if (supervisor.capacity > 0) {
            const percentage =
              this.matchesHelper.calculateProjectAndSupervisorSimilarity(
                project,
                supervisor,
              );
            if (highestPercentage <= percentage) {
              highestPercentage = percentage;
              highestSupervisorIndex = index;
            }
          }
        });

        if (highestSupervisorIndex == -1) {
          matchResult.push({
            student: student,
            supervisor: null,
            isMatched: false,
            isApproved: false,
          });
        } else {
          supervisors[highestSupervisorIndex].capacity -= 1;
          matchResult.push({
            student: student,
            supervisor: supervisors[highestSupervisorIndex],
            isMatched: false,
            isApproved: false,
          });
        }
      });
    }

    return matchResult;
  }

  private async getStudentWithProjectsByStudentIds(studentIds: string[]) {
    const promises = studentIds.map((id) =>
      this.getStudentWithProjectByStudentId(id),
    );
    return await Promise.all(promises);
  }

  private async getSupervisorsByFieldIds(
    fieldIds: string[],
  ): Promise<ISupervisor[]> {
    const promises = fieldIds.map((id) =>
      this.supervisorsService.indexSupervisor({
        fieldId: id,
        minCapacity: 1,
      }),
    );
    const supervisorsRes = await Promise.all(promises);
    return supervisorsRes.map((res) => res.data).flat();
  }

  private async getSuperviorsBySupervisorIds(
    supervisorIds: string[],
  ): Promise<ISupervisor[]> {
    const promises = supervisorIds.map((id) =>
      this.supervisorsService.getSupervisorById(id),
    );
    const supervisorsRes = await Promise.all(promises);
    return supervisorsRes.map((res) => res.data);
  }

  private async getStudentWithProjectByStudentId(
    studentId: string,
  ): Promise<IStudentWithProject> {
    const { data: student } = await this.studentsService.getStudentById(
      studentId,
    );
    const { data: project } = await this.projectsService.getProjectByStudentId(
      studentId,
    );
    return { ...student, project };
  }
}
