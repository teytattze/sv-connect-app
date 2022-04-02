import { Provider } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import { AccountsCode } from '@sv-connect/domain';
import {
  mockAccountsWithPassword,
  mockAdminAccountsRepository,
} from '../../../mocks/accounts.mock';
import { AdminAccountsRepository } from './accounts.admin.repository';
import { AdminAccountsService } from './accounts.admin.service';

describe('AdminAccountsService', () => {
  let service: AdminAccountsService;
  const mockProviders: Provider[] = [
    {
      provide: AdminAccountsRepository,
      useValue: mockAdminAccountsRepository,
    },
  ];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AdminAccountsService, ...mockProviders],
    }).compile();
    service = await moduleRef.get<AdminAccountsService>(AdminAccountsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  describe('getAccountByEmail', () => {
    it('should get account by email', async () => {
      const email = 'tattzetey@gmail.com';
      mockAdminAccountsRepository.findAccount.mockResolvedValue(
        mockAccountsWithPassword.find((acc) => acc.email === email),
      );
      const account = await service.getAccountByEmail(email);
      expect(account).toEqual({
        id: '2077babd-08c7-492a-bce5-b35ce8fbdbbb',
        email: 'tattzetey@gmail.com',
        emailVerified: false,
        password:
          '$2a$14$6U5gE4QKJnVU0jfL618SJOWPBy6Wt8LR/c8gU2aowzO.aCv2Sg5d.',
        role: 'STUDENT',
        createdAt: '2022-01-19T23:35:13.085Z',
        updatedAt: '2022-01-19T23:35:13.087Z',
      });
    });

    it('should throw not found error', async () => {
      const email = 'abc123@gmail.com';
      mockAdminAccountsRepository.findAccount.mockResolvedValue(
        mockAccountsWithPassword.find((acc) => acc.email === email),
      );
      try {
        await service.getAccountByEmail(email);
      } catch (error) {
        expect(error).toEqual(new RpcException(AccountsCode.ACCOUNT_NOT_FOUND));
      }
    });
  });
});
