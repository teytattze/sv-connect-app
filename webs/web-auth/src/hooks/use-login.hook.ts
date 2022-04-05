import { IAccount, ICoreHttpResponse, ILoginPayload } from '@sv-connect/domain';
import { login } from '@sv-connect/web-shared';
import { useMutation, UseMutationOptions } from 'react-query';

export function useLogin(
  options?: Omit<
    UseMutationOptions<
      ICoreHttpResponse<IAccount>,
      ICoreHttpResponse<null>,
      ILoginPayload
    >,
    'mutationKey' | 'mutationFn'
  >,
) {
  return useMutation<
    ICoreHttpResponse<IAccount>,
    ICoreHttpResponse<null>,
    ILoginPayload
  >((payload) => login(payload), options);
}
