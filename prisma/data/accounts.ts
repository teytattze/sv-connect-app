import { Account } from '@prisma/client';
import { rand, randBoolean, randEmail, randUuid } from '@ngneat/falso';

export const createAccounts = (): Account[] => {
  const accounts: Account[] = [];
  for (let i = 0; i < 100; i++) {
    accounts.push({
      id: randUuid(),
      email: randEmail(),
      emailVerified: randBoolean(),
      role: rand(['STUDENT', 'SUPERVISOR']),
      password: '$2a$10$VZUp.BOLT3DqDZUgKOc2nuFJqyPyZmX95eHPDUk2iqRdYmyEIZODK',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return accounts;
};
