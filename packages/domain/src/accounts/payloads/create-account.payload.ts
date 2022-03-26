import { AccountRole } from '@prisma/client';

export interface ICreateAccountPayload {
  email: string;
  emailVerified?: boolean;
  password: string;
  role?: AccountRole;
}
