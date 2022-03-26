export {
  MatchSelectedStudentsAndSupervisorsBody,
  MatchSelectedStudentsBody,
  MatchSingleStudentBody,
} from './dtos/create-match.dto';
export { MatchDto } from './dtos/match.dto';

export type { IMatchesClient } from './interface/client.interface';
export type { IMatch } from './interface/match.interface';
export type { IMatchesService } from './interface/service.interface';

export type {
  IMatchSelectedStudentsAndSupervisorsPayload,
  IMatchSelectedStudentsPayload,
  IMatchSingleStudentPayload,
} from './payload/create-match.payload';
