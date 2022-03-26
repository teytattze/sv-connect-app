import { AccountRole } from '@prisma/client';
import * as jose from 'jose';

export interface JwtAccount {
  id: string;
  email: string;
  emailVerified: boolean;
  role: AccountRole;
}

export interface JwtPayload extends jose.JWTPayload {
  account: JwtAccount;
}
