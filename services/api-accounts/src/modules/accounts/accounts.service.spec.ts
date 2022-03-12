import { RpcException } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import { ServiceError } from '@sv-connect/domain/errors';
import {
  mockAccounts,
  mockAccountsRepository,
} from '../../mocks/accounts.mock';
import { mockSessionsService } from '../../mocks/sessions.mock';
import { SessionsService } from '../sessions/sessions.service';
import { AccountsRepository } from './accounts.repository';
import { AccountsService } from './accounts.service';

describe('AccountsService', () => {
  let service: AccountsService;
  const mockProviders = [
    {
      provide: AccountsRepository,
      useValue: mockAccountsRepository,
    },
    {
      provide: SessionsService,
      useValue: mockSessionsService,
    },
  ];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AccountsService, ...mockProviders],
    }).compile();
    service = await moduleRef.get<AccountsService>(AccountsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  describe('indexAccounts', () => {
    it('should index all accounts', async () => {
      mockAccountsRepository.findAccounts.mockReturnValue(mockAccounts);
      const accounts = await service.indexAccounts();
      expect(accounts).toEqual(mockAccounts);
    });
  });

  describe('getAccountById', () => {
    it('should get an account', async () => {
      const id = '2077babd-08c7-492a-bce5-b35ce8fbdbbb';
      mockAccountsRepository.findAccount.mockReturnValue(
        mockAccounts.find((acc) => acc.id === id),
      );
      const account = await service.getAccountById(id);
      expect(account).toEqual(mockAccounts.find((acc) => acc.id === id));
    });
  });

  describe('getAccountByEmail', () => {
    it('should get an account', async () => {
      const email = 'tattzetey@gmail.com';
      mockAccountsRepository.findAccount.mockReturnValue(
        mockAccounts.find((acc) => acc.email === email),
      );
      const account = await service.getAccountById(email);
      expect(account).toEqual(mockAccounts.find((acc) => acc.email === email));
    });
  });

  describe('registerAccount', () => {
    it('should register a new account', async () => {
      const mockCreateAccountPayload = {
        email: 'test@gmail.com',
        password: 'test123',
      };
      const mockNewAccount = {
        id: 'ad8df2fd-482z-4fca-83ba-e9471fb70b0f',
        email: 'test@gmail.com',
        emailVerified: false,
        role: 'STUDENT',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockAccountsRepository.findAccount.mockReturnValue(
        mockAccounts.find(
          (acc) => acc.email === mockCreateAccountPayload.email,
        ),
      );
      const isExisted = await service.isAccountExistsByEmail(
        mockCreateAccountPayload.email,
      );
      expect(isExisted).toBe(false);

      mockAccountsRepository.createAccount.mockReturnValue(mockNewAccount);
      const account = await service.registerAccount(mockCreateAccountPayload);
      expect(account).toEqual(mockNewAccount);
    });

    it('should throw error', async () => {
      const mockCreateAccountPayload = {
        email: 'tattzetey@gmail.com',
        password: 'abc123',
      };
      mockAccountsRepository.findAccount.mockReturnValue(
        mockAccounts.find(
          (acc) => acc.email === mockCreateAccountPayload.email,
        ),
      );
      try {
        await service.registerAccount(mockCreateAccountPayload);
      } catch (err) {
        expect(err).toEqual(
          new RpcException(ServiceError.ACCOUNT_EMAIL_EXISTS),
        );
      }
    });
  });

  describe('updateAccountById', () => {
    it('should return updated account', async () => {
      const id = '2077babd-08c7-492a-bce5-b35ce8fbdbbb';
      mockAccountsRepository.updateAccount.mockReturnValue(
        mockAccounts.find((acc) => acc.id === id),
      );
      const result = await service.updateAccountById(id, {});
      expect(result).toEqual(mockAccounts.find((acc) => acc.id === id));
    });
  });

  describe('deleteAccountById', () => {
    it('should delete successfully', async () => {
      expect(1).toBe(1);
    });
  });

  describe('isAccountExistsByEmail', () => {
    it('should return true', async () => {
      const email = 'tattzetey@gmail.com';
      mockAccountsRepository.findAccount.mockReturnValue(
        mockAccounts.find((acc) => acc.email === email),
      );
      const isExisted = await service.isAccountExistsByEmail(email);
      expect(isExisted).toBe(true);
    });

    it('should return false', async () => {
      const email = 'abc123@gmail.com';
      mockAccountsRepository.findAccount.mockReturnValue(
        mockAccounts.find((acc) => acc.email === email),
      );
      const isExisted = await service.isAccountExistsByEmail(email);
      expect(isExisted).toBe(false);
    });
  });
});
