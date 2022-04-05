import { AccountRole } from '@sv-connect/domain';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/use-auth.hook';

interface IAuthGuardProps {
  children: ReactNode;
  type?: 'hidden' | 'redirect';
  roles?: AccountRole[];
}

export function AuthGuard({
  children,
  type = 'redirect',
  roles = [],
}: IAuthGuardProps) {
  const { account } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (type === 'redirect' && !hasPermission()) navigate('/');
  }, [account]);

  const hasPermission = (): boolean => {
    if (!account) return false;
    if (roles.length > 0 && !roles.includes(account.role)) return false;
    return true;
  };

  if (!hasPermission()) return null;
  return <div>{children}</div>;
}
