import { IAccount, Nullable } from '@sv-connect/domain';
import { createContext } from 'react';

interface IAuthContextValue {
  account: Nullable<IAccount>;
}

export const AuthContext = createContext<IAuthContextValue>({ account: null });
