import { Student } from '@prisma/client';
import { Nullable } from 'src/common/types';
import { IProject } from 'src/projects';

export interface IStudent extends Student {}

export interface IStudentWithProject extends IStudent {
  project: Nullable<IProject>;
}
