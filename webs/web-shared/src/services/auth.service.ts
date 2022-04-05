import { IAccount, ICoreHttpResponse, ILoginPayload } from '@sv-connect/domain';
import { HttpRequestMethod } from '../enums/http.enum';

const API_AUTH_BASE_URL = process.env.REACT_APP_API_AUTH_BASE_URL;

export const login = async ({
  email,
  password,
}: ILoginPayload): Promise<ICoreHttpResponse<IAccount>> => {
  const response = await fetch(`${API_AUTH_BASE_URL}/login`, {
    method: HttpRequestMethod.POST,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  const result = await response.json();
  return result;
};

export const logout = async (): Promise<ICoreHttpResponse<null>> => {
  const response = await fetch(`${API_AUTH_BASE_URL}/logout`, {
    method: HttpRequestMethod.POST,
    headers: { 'Content-Type': 'application/json' },
  });
  const result = await response.json();
  return result;
};

export const validateJwt = async (): Promise<ICoreHttpResponse<IAccount>> => {
  const response = await fetch(`${API_AUTH_BASE_URL}/validate/jwt`, {
    method: HttpRequestMethod.POST,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  const result = await response.json();
  return result;
};
