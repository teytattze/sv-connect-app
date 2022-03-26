export type { IConnectAccountPayload } from './accounts/accounts.connect';
export type { IDisconnectAccountPayload } from './accounts/accounts.disconnect';
export type { IUpdateOneAccountRelationPayload } from './accounts/accounts.update';

export type { IConnectFieldPayload } from './fields/fields.connect';
export type { IDisconnectFieldPayload } from './fields/fields.disconnect';
export type {
  IUpdateManyFieldsRelationsPayload,
  IUpdateOneFieldRelationPayload,
} from './fields/fields.update';

export type { IConnectSpecializationPayload } from './specializations/specializations.connect';
export type { IDisconnectSpecializationPayload } from './specializations/specializations.disconnect';
export type { IUpdateManySpecializationsRelationPayload } from './specializations/specializations.update';

export type { IConnectStudentPayload } from './students/students.connect';
export type { IDisconnectStudentPayload } from './students/students.disconnect';
export type { IUpdateOneStudentRelationPayload } from './students/students.update';

export type { IConnectSupervisorPayload } from './supervisors/supervisors.connect';
export type { IDisconnectSupervisorPayload } from './supervisors/supervisors.disconnect';
export type { IUpdateOneSupervisorRelationPayload } from './supervisors/supervisors.update';
