export { BaseDto } from './base.dto';

export { ConnectAccountBody } from './accounts/connect-account.dto';
export { DisconnectAccountBody } from './accounts/disconnect-account.dto';

export { ConnectFieldBody } from './fields/connect-field.dto';
export { DisconnectFieldBody } from './fields/disconnect-field.dto';
export {
  UpdateManyFieldsRelationBody,
  UpdateOneFieldRelationBody,
} from './fields/update-field-relation.dto';

export { ConnectSpecializationBody } from './specializations/connect-specialization.dto';
export { DisconnectSpecializationBody } from './specializations/disconnect-specialization.dto';
export { UpdateManySpecializationsRelationBody } from './specializations/update-specializations-relation.dto';

export { ConnectStudentBody } from './students/connect-student.dto';
export { DisconnectStudentBody } from './students/disconnect-student.dto';
export { UpdateOneStudentRelationBody } from './students/update-students-relation.dto';

export { ConnectSupervisorBody } from './supervisors/connect-supervisor.dto';
export { DisconnectSupervisorBody } from './supervisors/disconnect-supervisor.dto';
export { UpdateOneSupervisorRelationBody } from './supervisors/update-supervisors-relation.dto';
