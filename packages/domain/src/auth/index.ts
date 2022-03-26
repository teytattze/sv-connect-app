export {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_HEADER_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from './constants/token.const';

export { LoginBody } from './dtos/login.dto';

export type { IAuthTokens } from './interfaces/auth-tokens.interface';
export type { IAuthClient } from './interfaces/client.interface';
export type { IAuthService } from './interfaces/service.interface';

export type { ILoginPayload } from './payloads/login.payload';
export type { IRefreshAccessPayload } from './payloads/refresh-access.payload';
