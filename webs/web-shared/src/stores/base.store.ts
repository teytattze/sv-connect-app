import create, { GetState, SetState } from 'zustand';
import { createAuthSlice } from './auth.store';

export type StoreSlice<T extends object, E extends object = T> = (
  set: SetState<E extends T ? E : E & T>,
  get: GetState<E extends T ? E : E & T>,
) => T;

const createRootSlice = (set: SetState<any>, get: GetState<any>) => ({
  ...createAuthSlice(set, get),
});

export const useStore = create(createRootSlice);
