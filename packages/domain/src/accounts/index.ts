export { AccountRole } from '@prisma/client';

export { ACCOUNT_COOKIE_NAME } from './constants/account.const';

export { AccountDto } from './dtos/account.dto';
export {
  GetAccountByEmailParam,
  GetAccountByIdParam,
} from './dtos/get-account.dto';
export { CreateAccountBody } from './dtos/create-account.dto';
export {
  UpdateAccountBody,
  UpdateAccountByIdParam,
} from './dtos/update-account.dto';
export { DeleteAccountByIdParam } from './dtos/delete-account.dto';

export { AdminGetAccountByEmailParam } from './dtos/admin/get-account.dto';

export { AccountEntity } from './entity/account.entity';

export type { IAccount } from './interfaces/account.interface';
export type {
  IAccountsClient,
  IAdminAccountsClient,
} from './interfaces/client.interface';
export type {
  IAccountsService,
  IAdminAccountsService,
} from './interfaces/service.interface';

export type { ICreateAccountPayload } from './payloads/create-account.payload';
export type { IUpdateAccountPayload } from './payloads/update-account.payload';
