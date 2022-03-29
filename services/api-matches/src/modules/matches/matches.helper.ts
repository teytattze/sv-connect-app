import { Injectable } from '@nestjs/common';
import { IProject, IStudentWithProject, ISupervisor } from '@sv-connect/domain';

@Injectable()
export class MatchesHelper {
  calculateProjectAndSupervisorSimilarity(
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

  makeStudentWithProjectsByFieldMap = (
    studentWithProjects: IStudentWithProject[],
  ): Map<string, IStudentWithProject[]> => {
    const result = new Map<string, IStudentWithProject[]>();
    studentWithProjects.forEach((studentWithProject) => {
      const project = studentWithProject.project;
      const fieldId = project.field.id;
      if (result.has(fieldId)) {
        result.get(fieldId).push(project);
      } else {
        result.set(fieldId, [project]);
      }
    });
    return result;
  };

  makeSupervisorsByFieldMap = (
    supervisors: ISupervisor[],
  ): Map<string, ISupervisor[]> => {
    const supervisorsByField = new Map<string, ISupervisor[]>();
    supervisors.forEach((supervisor) => {
      const fieldId = supervisor.field.id;
      if (supervisorsByField.has(fieldId)) {
        supervisorsByField.get(fieldId).push(supervisor);
      } else {
        supervisorsByField.set(fieldId, [supervisor]);
      }
    });
    return supervisorsByField;
  };

  makeFieldIdsFromStudentWithProjects = (
    studentWithProjects: IStudentWithProject[],
  ): string[] => {
    const fieldIds = new Set<string>();
    studentWithProjects.forEach((studentWithProject) => {
      fieldIds.add(studentWithProject.project.field.id);
    });
    return Array.from(fieldIds);
  };
}
