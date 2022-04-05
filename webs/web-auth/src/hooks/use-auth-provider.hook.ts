import { IAccount, Nullable } from '@sv-connect/domain';
import { useEffect, useState } from 'react';
import { useValidateJwt } from './use-validate-jwt.hook';

export const useAuthProvider = () => {
  const [account, setAccount] = useState<Nullable<IAccount>>(null);

  const { mutate: validateJwt } = useValidateJwt({
    onError: () => setAccount(null),
    onSuccess: ({ data, statusCode }) => {
      console.log('Run');
      if (statusCode === 200) setAccount(data);
      else setAccount(null);
    },
  });

  useEffect(() => {
    validateJwt();
  }, []);

  return { account };
};
