import { Account } from '@prisma/client';

export interface IAccount extends Omit<Account, 'password'> {
  password?: string;
}
