import { ReactNode } from 'react';
import { AuthContext } from '../contexts/auth.context';
import { useAuthProvider } from '../hooks/use-auth-provider.hook';

interface IAuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
