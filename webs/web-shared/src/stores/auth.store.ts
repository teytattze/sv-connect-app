import { IAccount, Nullable } from '@sv-connect/domain';
import { StoreSlice } from './base.store';

interface IAuthSlice {
  account: Nullable<IAccount>;
  setAccount: (account: Nullable<IAccount>) => void;
}

export const createAuthSlice: StoreSlice<IAuthSlice> = (set) => ({
  account: null,
  setAccount: (account: Nullable<IAccount>) => set({ account }),
});
