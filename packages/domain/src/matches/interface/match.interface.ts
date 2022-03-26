import { IStudentWithProject } from '../../students';
import { ISupervisor } from '../../supervisors';
import { Nullable } from '../../common/types/common.type';

export interface IMatch {
  student: Nullable<IStudentWithProject>;
  supervisor: Nullable<ISupervisor>;
  isMatched: boolean;
  isApproved: boolean;
}
