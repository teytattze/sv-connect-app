import {
  IAccount,
  ICoreHttpResponse,
  ICreateAccountPayload,
} from '@sv-connect/domain';

const API_ACCOUNTS_BASE_URL = process.env.REACT_APP_API_ACCOUNTS_BASE_URL;

export const indexAccounts = async (): Promise<
  ICoreHttpResponse<IAccount[]>
> => {
  const response = await fetch(`${API_ACCOUNTS_BASE_URL}`);
  const result = await response.json();
  return result;
};

export const createAccount = async ({
  email,
  password,
  emailVerified,
  role,
}: ICreateAccountPayload): Promise<ICoreHttpResponse<IAccount>> => {
  const response = await fetch(`${API_ACCOUNTS_BASE_URL}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      emailVerified,
      role,
    }),
  });
  const result = await response.json();
  return result;
};
