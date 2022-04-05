import {
  IAccount,
  ICoreHttpResponse,
  ICreateAccountPayload,
} from '@sv-connect/domain';
import { createAccount } from '@sv-connect/web-shared';
import { useMutation, UseMutationOptions } from 'react-query';

export function useCreateAccount(
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<IAccount>,
      ICoreHttpResponse<null>,
      ICreateAccountPayload
    >,
    'mutationKey' | 'mutationFn'
  >,
) {
  return useMutation<
    ICoreHttpResponse<IAccount>,
    ICoreHttpResponse<null>,
    ICreateAccountPayload
  >((payload) => createAccount(payload), options);
}
