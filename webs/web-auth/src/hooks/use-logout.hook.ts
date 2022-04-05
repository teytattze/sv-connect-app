import { ICoreHttpResponse } from '@sv-connect/domain';
import { logout } from '@sv-connect/web-shared';
import { useMutation, UseMutationOptions } from 'react-query';

export function useLogout(
  options?: Omit<
    UseMutationOptions<ICoreHttpResponse<null>, ICoreHttpResponse<null>>,
    'mutationKey' | 'mutationFn'
  >,
) {
  return useMutation<ICoreHttpResponse<null>, ICoreHttpResponse<null>>(
    logout,
    options,
  );
}
