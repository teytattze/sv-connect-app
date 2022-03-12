export interface IConnectAccountPayload {
  id?: string;
  email?: string;
}

export interface IConnectFieldPayload {
  id?: string;
  title?: string;
}

export interface IConnectInviteePayload {
  id: string;
}

export interface IConnectInviterPayload {
  id: string;
}

export interface IConnectSpecializationPayload {
  id?: string;
  title?: string;
}

export interface IConnectStudentPayload {
  id: string;
}

export interface IConnectSupervisorPayload {
  id: string;
}
