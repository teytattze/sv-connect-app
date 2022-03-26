export enum BaseServiceCode {
  GENERAL = '000',
  ACCOUNTS = '001',
  AUTH = '002',
  FIELDS = '003',
  INVITATIONS = '004',
  MATCHES = '005',
  PROFILES = '006',
  PROJECTS = '007',
  SESSIONS = '008',
  SPECIALIZATIONS = '009',
  STUDENTS = '010',
  SUPERVISORS = '011',
}

export enum PrismaErrorCode {
  UNIQUE_CONSTRAINT = 'P2002',
  NOT_FOUND = 'P2025',
}
