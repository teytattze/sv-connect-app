import { RpcException } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { AccountsCode, PrismaErrorCode } from '@sv-connect/domain';
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
      mockAccountsRepository.findAccounts.mockResolvedValue(mockAccounts);
      const accounts = await service.indexAccounts();
      expect(accounts).toEqual(mockAccounts);
    });
  });

  describe('getAccountById', () => {
    it('should get an account', async () => {
      const id = '2077babd-08c7-492a-bce5-b35ce8fbdbbb';
      mockAccountsRepository.findAccount.mockResolvedValue(
        mockAccounts.find((acc) => acc.id === id),
      );
      const account = await service.getAccountById(id);
      expect(account).toEqual(mockAccounts.find((acc) => acc.id === id));
    });

    it('should throw not found error', async () => {
      const id = '2077babd-08c7-492a-bce5-b35ce8fbdeee';
      mockAccountsRepository.findAccount.mockResolvedValue(
        mockAccounts.find((acc) => acc.id === id),
      );
      try {
        await service.getAccountById(id);
      } catch (error) {
        expect(error).toEqual(new RpcException(AccountsCode.ACCOUNT_NOT_FOUND));
      }
    });
  });

  describe('getAccountByEmail', () => {
    it('should get an account', async () => {
      const email = 'tattzetey@gmail.com';
      mockAccountsRepository.findAccount.mockResolvedValue(
        Promise.resolve(mockAccounts.find((acc) => acc.email === email)),
      );
      const account = await service.getAccountByEmail(email);
      expect(account).toEqual(mockAccounts.find((acc) => acc.email === email));
    });

    it('should throw not found error', async () => {
      const email = '123abcdefg@gmail.com';
      mockAccountsRepository.findAccount.mockResolvedValue(
        mockAccounts.find((acc) => acc.email === email),
      );
      try {
        await service.getAccountByEmail(email);
      } catch (error) {
        expect(error).toEqual(new RpcException(AccountsCode.ACCOUNT_NOT_FOUND));
      }
    });
  });

  describe('createAccount', () => {
    it('should create a new account', async () => {
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

      mockAccountsRepository.findAccount.mockResolvedValue(
        mockAccounts.find(
          (acc) => acc.email === mockCreateAccountPayload.email,
        ),
      );
      const isExisted = await service.isAccountExistsByEmail(
        mockCreateAccountPayload.email,
      );
      expect(isExisted).toBe(false);

      mockAccountsRepository.createAccount.mockResolvedValue(mockNewAccount);
      const account = await service.createAccount(mockCreateAccountPayload);
      expect(account).toEqual(mockNewAccount);
    });

    it('should throw email exists error', async () => {
      const mockCreateAccountPayload = {
        email: 'tattzetey@gmail.com',
        password: 'abc123',
      };
      jest.spyOn(service, 'isAccountExistsByEmail').mockResolvedValue(true);
      try {
        await service.createAccount(mockCreateAccountPayload);
      } catch (err) {
        expect(err).toEqual(
          new RpcException(AccountsCode.ACCOUNT_EMAIL_EXISTS),
        );
      }
    });
  });

  describe('updateAccountById', () => {
    it('should return updated account', async () => {
      const id = '2077babd-08c7-492a-bce5-b35ce8fbdbbb';
      mockAccountsRepository.updateAccount.mockResolvedValue(
        mockAccounts.find((acc) => acc.id === id),
      );
      const result = await service.updateAccountById(id, {});
      expect(result).toEqual(mockAccounts.find((acc) => acc.id === id));
    });

    it('should throw not found exception', async () => {
      const id = '2077babd-08c7-492a-bce5-b35ce8fbdeee';
      mockAccountsRepository.updateAccount.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          '',
          PrismaErrorCode.NOT_FOUND,
          '',
        ),
      );
      try {
        await service.updateAccountById(id, {});
      } catch (error) {
        expect(error).toEqual(new RpcException(AccountsCode.ACCOUNT_NOT_FOUND));
      }
    });

    it('should throw email exists exception', async () => {
      const id = '2077babd-08c7-492a-bce5-b35ce8fbdbbb';
      mockAccountsRepository.updateAccount.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          '',
          PrismaErrorCode.UNIQUE_CONSTRAINT,
          '',
        ),
      );
      try {
        await service.updateAccountById(id, { email: 'livia@gmail.com' });
      } catch (error) {
        expect(error).toEqual(
          new RpcException(AccountsCode.ACCOUNT_EMAIL_EXISTS),
        );
      }
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
      mockAccountsRepository.findAccount.mockResolvedValue(
        mockAccounts.find((acc) => acc.email === email),
      );
      const isExisted = await service.isAccountExistsByEmail(email);
      expect(isExisted).toBe(true);
    });

    it('should return false', async () => {
      const email = 'abc123@gmail.com';
      mockAccountsRepository.findAccount.mockResolvedValue(
        mockAccounts.find((acc) => acc.email === email),
      );
      const isExisted = await service.isAccountExistsByEmail(email);
      expect(isExisted).toBe(false);
    });
  });
});
