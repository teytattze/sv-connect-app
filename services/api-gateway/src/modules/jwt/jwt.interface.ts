import { AccountRole } from '@prisma/client';
import { JWTPayload } from 'jose';

export interface IJwtPayloadAccount {
  id: string;
  email: string;
  emailVerified: boolean;
  role: AccountRole;
}

export interface IJwtPayload extends JWTPayload {
  account: IJwtPayloadAccount;
}
