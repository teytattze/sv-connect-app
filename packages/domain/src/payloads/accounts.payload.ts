import { AccountRole } from '../enums/accounts.enum';

export interface ICreateAccountPayload {
  email: string;
  emailVerified?: boolean;
  password: string;
  role?: AccountRole;
}

export interface IUpdateAccountPayload {
  email?: string;
  emailVerified?: boolean;
  password?: string;
}
