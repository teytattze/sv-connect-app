import { ApiProperty } from '@nestjs/swagger';
import { StudentWithProjectDto } from '../../students';
import { SupervisorDto } from '../../supervisors';
import { IMatch } from '../interface/match.interface';

export class MatchDto implements IMatch {
  @ApiProperty({ type: StudentWithProjectDto })
  student: StudentWithProjectDto;

  @ApiProperty({ type: SupervisorDto })
  supervisor: SupervisorDto;

  @ApiProperty()
  isApproved: boolean;

  @ApiProperty()
  isMatched: boolean;
}
